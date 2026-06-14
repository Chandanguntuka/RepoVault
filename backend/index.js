require("dotenv").config();

const express = require("express");
 const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
 const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");


console.log("ACCESS:", process.env.AWS_ACCESS_KEY);


//step1 : yargs setup
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");//giving process.argv except first two default args space btwn the

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");



//except system commands all other commands will be defined here process.agrv
yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits to S3", {}, pushRepo)
  .command("pull", "Pull commits from S3", {}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  //user must provide at least one command
  .demandCommand(1, "You need at least one command")
  .help().argv;



function startServer() {
  const app = express();
  const port = process.env.PORT || 3002;


  app.use(bodyParser.json()); // Middleware for parsing JSON bodies
  app.use(express.json()); // Built-in middleware for parsing JSON

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ Unable to connect DB:", err));


      app.use(cors({ origin: "*" }));

  // ✅ Prefix all backend routes with /api
  app.use("/", mainRouter);
  
  let user  = null; // Variable to store the user ID of the connected client
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom",(userID) =>{
       user = userID;
       console.log("User joined room:", userID);
       socket.join(userID);
    })
    console.log(" New WebSocket connection");
  });

     const db = mongoose.connection;
  db.once("open", () => {
    console.log("MongoDB connection established, starting server...");
    //CRUD operations and other server logic can be placed here, ensuring they only run after a successful DB connection
  });

  httpServer.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
  });
}
