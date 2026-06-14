
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");


dotenv.config();
const uri = process.env.MONGODB_URI;

let client;
//establishing the connection to the database and starting the server only after a successful connection is established is crucial for ensuring that all database operations can be performed without issues. By doing this, we can prevent potential errors that may arise from trying to access the database before it's ready, and it also allows us to handle any connection errors gracefully before the server starts accepting requests.

async function connectClient() {
  if (!client) {
    // if u not eestablish the connection before, then only connect to the database and assign the client variable, otherwise if the connection is already established, just use the existing client variable
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
    const db = client.db("versionControl");
    const usersCollection = db.collection("users");

    // Check if username exists
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
    const db = client.db("versionControl");
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
    const db = client.db("versionControl");
    const usersCollection = db.collection("users");
  //changing it to array because the find method returns a cursor and we need to convert it to an array to send it as a response
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
    const db = client.db("versionControl");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(currentID) });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    //res.json(user);  responsde that in the json format the user profile that we get from the database, and we can use this data to display the user profile on the frontend
    //  res.json({ user });
    res.send(user);
  } catch (err) {
    console.error("Error fetching user profile:", err.message);
    res.status(500).json({ message: "Server error!" });
  }

 
}

// UPDATE USER PROFILE
// async function updateUserProfile(req, res) {

async function updateUserProfile(req, res) {
  const currentID = req.params.id;
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("versionControl");
    const usersCollection = db.collection("users");

    let updateFields = {};
    if (email) updateFields.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(currentID) },
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Server error!" });
  }
}


// DELETE USER PROFILE
async function deleteUserProfile(req, res) {
  const currentID = req.params.id;

  try {
    await connectClient();
    const db = client.db("versionControl");
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
