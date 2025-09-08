// // const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");
// // const { MongoClient  }  = require("mongodb");
// // const dotenv = require("dotenv");


// // dotenv.config();
// // const uri = process.env.MONGODB_URI;

// // let client;

// // async function connectClient() {
// //   if(!client) {
// //     client = new MongoClient(uri, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     try {
// //       await client.connect();
// //       console.log("Connected to MongoDB");
// //     } catch (error) {
// //       console.error("MongoDB connection error:", error);
// //     }
// //   }     
// //     return client;
// // }


// // //user has a token that as a expiry 
// // // if expires  again user wants to relogin re account creating
// // //jwt and password--> to encrpt we use pcrypt 
// // //and we use mongoose to connect to the database
// // // we use bcrypt to hash the password and store it in the database
// //  async function signup (req,res) {
// //  // res.send("User signed up");
// //    const { username,password, email } = req.body;    //destructuiring
// //   try{
// //     await connectClient();
// //     const db = client.db("githubclone");
// //     const usersCollection = db.collection("users");   

// //     const user = await usersCollection.findOne({ username: username });
// //     if(user){
// //         return res.status(400).json({})
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hashedPassword = await bcrypt.hash(password, salt);
// //     const newUser = {
// //       username: username,
// //       email: email,
// //       password: hashedPassword,
// //       repositories : [],
// //       followedUsers: [],
// //         starRepos: [],
// //     };
// //   const results = await usersCollection.insertOne(newUser);
// // const token = jwt.sign(
// //     { id:results.insertId },
// //     process.env.JWT_SECRET_KEY,
// //     { expiresIn: "1h" }

// // );
// //     res.json({token});

// //     res.status(201).json({ message: "User created successfully", token: token   });  
// //   }catch(err){
// //     console.error("Error connecting to MongoDB:", err);
// //     res.status(500).send("Internal Server Error");
// //     return;
// //   }

// // };
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv");
// const User = require("../models/userModel");  // this is your mongoose model

// dotenv.config();

// // async function signup(req, res) {
// //   const { username, password, email } = req.body;
// //   if (!username || !password || !email) {
// //     return res.status(400).json({ message: "All fields required" });
// //   }

// //   try {
// //     const existingUser = await User.findOne({ username });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "Username already taken" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       username,
// //       email,
// //       password: hashedPassword,
// //     });

// //     const savedUser = await newUser.save();

// //     const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, {
// //       expiresIn: "1h",
// //     });

// //     res.status(201).json({
// //       message: "User created successfully",
// //       token,
// //     });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).send("Internal Server Error");
// //   }
// // }

// await connectClient();
// const db = client.db("githubclone");
// const usersCollection = db.collection("users");

// const user = await usersCollection.findOne({ username });
// if (user) {
//   return res.status(400).json({ message: "User already exists" });
// }

// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

// const newUser = {
//   username,
//   email,
//   password: hashedPassword,
//   repositories: [],
//   followedUsers: [],
//   starRepos: [],
// };

// const result = await usersCollection.insertOne(newUser);

// const token = jwt.sign(
//   { id: result.insertedId },
//   process.env.JWT_SECRET_KEY,
//   { expiresIn: "1h" }
// );

// res.status(201).json({
//   message: "User created successfully",
//   token,
// });


// async function login(req, res) {
//   // res.send("User logged in");
//   const { email, password } = req.body;

//   try {
//     await connectClient();
//     const db = client.db("githubclone");
//     const usersCollection = db.collection("users");

//         const user = await usersCollection.findOne({ email: email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid  Credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }

//         const token = jwt.sign(
//             { id: user._id },
//             process.env.JWT_SECRET_KEY,
//             { expiresIn: "1h" }
//         );

//         res.json({ token , userId: user_id});
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).send("Internal Server Error");
//     }
// };

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { MongoClient, ObjectId } = require("mongodb");
// const dotenv = require("dotenv");

// dotenv.config();
// const uri = process.env.MONGODB_URI;

// let client;

// async function connectClient() {
//   if (!client) {
//     client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//   }
// }

// // SIGNUP
// async function signup(req, res) {
//   const { username, password, email } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     // Check if username exists
//     const existingUser = await usersCollection.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       username,
//       email,
//       password: hashedPassword,
//       repositories: [],
//       followedUsers: [],
//       starRepos: [],
//     };

//     const result = await usersCollection.insertOne(newUser);

//     const token = jwt.sign(
//       { id: result.insertedId },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     res.status(201).json({
//       message: "User created successfully",
//       token,
//       userId: result.insertedId,
//     });
//   } catch (err) {
//     console.error("Error during signup:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// // LOGIN
// async function login(req, res) {
//   const { email, password } = req.body;
//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res.json({ token, userId: user._id });
//   } catch (err) {
//     console.error("Error during login:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// // GET ALL USERS
// async function getAllUsers(req, res) {
//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     const users = await usersCollection.find({}).toArray();
//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching users:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// // GET USER PROFILE
// async function getUserProfile(req, res) {
//   const currentID = req.params.id;

//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     const user = await usersCollection.findOne({ _id: new ObjectId(currentID) });

//     if (!user) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error("Error fetching user profile:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// // UPDATE USER PROFILE
// async function updateUserProfile(req, res) {
//   const currentID = req.params.id;
//   const { email, password } = req.body;

//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     let updateFields = { email };
//     if (password) {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       updateFields.password = hashedPassword;
//     }

//     const result = await usersCollection.findOneAndUpdate(
//       { _id: new ObjectId(currentID) },
//       { $set: updateFields },
//       { returnDocument: "after" }
//     );

//     if (!result.value) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.json(result.value);
//   } catch (err) {
//     console.error("Error updating profile:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// // DELETE USER PROFILE
// async function deleteUserProfile(req, res) {
//   const currentID = req.params.id;

//   try {
//     await connectClient();
//     const db = client.db("GithubClone");
//     const usersCollection = db.collection("users");

//     const result = await usersCollection.deleteOne({ _id: new ObjectId(currentID) });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "User not found!" });
//     }

//     res.json({ message: "User Profile Deleted!" });
//   } catch (err) {
//     console.error("Error deleting profile:", err.message);
//     res.status(500).json({ message: "Server error!" });
//   }
// }

// module.exports = {
//   getAllUsers,
//   signup,
//   login,
//   getUserProfile,
//   updateUserProfile,
//   deleteUserProfile,
// };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const uri = process.env.MONGODB_URI;

let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
  }
}

// SIGNUP
async function signup(req, res) {
  const { username, password, email } = req.body;
  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    // Check if username exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      userId: result.insertedId,
    });
  } catch (err) {
    console.error("Error during signup:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

// LOGIN
async function login(req, res) {
  const { email, password } = req.body;
  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

// GET ALL USERS
async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

// GET USER PROFILE
async function getUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(currentID) });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

// UPDATE USER PROFILE
async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    let updateFields = { email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json(result.value);
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

// DELETE USER PROFILE
async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("GithubClone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.deleteOne({ _id: new ObjectId(currentID) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User Profile Deleted!" });
  } catch (err) {
    console.error("Error deleting profile:", err.message);
    res.status(500).json({ message: "Server error!" });
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
