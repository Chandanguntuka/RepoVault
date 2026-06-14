require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,       // ✅ ADD THIS
  secretAccessKey: process.env.AWS_SECRET_KEY,   // ✅ ADD THIS
  region: process.env.AWS_REGION                 // ✅ USE ENV REGION
});

const s3 = new AWS.S3();

const S3_BUCKET = "samplechandugh";

module.exports = { s3, S3_BUCKET }; 


// {
//   "Version": "2012-10-17",
//   "Statement": [
//     {
//       "Effect": "Allow",
//       "Principal": {
//         "AWS": "arn:aws:iam::810956796929:user/chandanGH"
//       },
//       "Action": "s3:*",
//       "Resource": [
//         "arn:aws:s3:::samplechandugh ",
//         "arn:aws:s3:::samplechandugh /*"
//       ]
//     }
//   ]
// }
