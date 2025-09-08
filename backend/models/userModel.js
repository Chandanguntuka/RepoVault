const mongoose = require("mongoose");
const { Schema } = mongoose;

// const UserSchema = new Schema({
//  // timestamps: true,
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   repositories: [
//     {
//       default: [],
//       type: Schema.Types.ObjectId,
//       ref: "Repository",
//     },
//   ],
//   followedUsers: [
//     {
//       default: [],
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
//   starRepos: [
//     {
//       default: [],
//       type: Schema.Types.ObjectId,
//       ref: "Repository",
//     },
//   ],
// });

const UserSchema = new Schema(
  {
     
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    repositories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [],
      },
    ],
    followedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    starRepos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Repository",
        default: [],
      },
    ],
  },
  { timestamps: true } 
);

const User = mongoose.model("User", UserSchema);

// module.exports = User;

//export default User;
// // module.exports = UserSchema;
module.exports = User;