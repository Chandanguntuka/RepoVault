// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const Issue = new Schema({
//   timestamps: true,
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["open", "closed"],
//     //list is catogary status selecting either open or closed to select
//     default: "open",
//   },
//   repository: {
//     type: Schema.Types.ObjectId,
//     //reference of repository
//     ref: "Repository",
//     required: true,
//   },
// });

// const Issue = mongoose.model("Issue", IssueSchema);
// module.exports = Issue;
// // export default Issue;
// // // module.exports = IssueSchema;

const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema({
  
   
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open",
  },
  repository: {
    type: Schema.Types.ObjectId,
    ref: "Repository",
    required: true,
  },
},{ timestamps: true });

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;