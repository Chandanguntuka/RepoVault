const fs = require('fs').promises; // Use promises for async operations
// This allows us to use async/await syntax for better readability
const path = require('path');
const { s3, S3_BUCKET } = require('../config/aws-config');

async function pushRepo(){
    // console.log("Pushing repository to S3...");

    const repoPath = path.resolve(process.cwd(), 'my_repo');
    const commitPath = path.join(repoPath, 'commits');

    try{

      const commitDirs = await fs.readdir(commitPath);

      for(const commitDir of commitDirs) {
          const commitFullPath = path.join(commitPath, commitDir);
          const files = await fs.readdir(commitFullPath);

          for(const file of files) {
              const filePath = path.join(commitFullPath, file);
              const fileContent = await fs.readFile(filePath);

              const params = {
                  Bucket: S3_BUCKET,
                  Key: `commits/${commitDir}/${file}`,
                  Body: fileContent
              };

              await s3.upload(params).promise();
            
          }
      }
        console.log("Repository pushed to S3 successfully.");

    }catch(err){
        console.error("Error pushing repository:", err);
    }

}


module.exports = { pushRepo };

// const fs = require('fs').promises; // <--- This is the key change
// const path = require('path');
// const { s3, S3_BUCKET } = require('../config/aws-config');

// async function pushRepo(){
//     // console.log("Pushing repository to S3...");

//     const repoPath = path.resolve(process.cwd(), 'my_repo');
//     const commitPath = path.join(repoPath, 'commits');

//     try{
//         // Check if commitPath exists before trying to read it
//         const commitPathExists = await fs.stat(commitPath).then(stat => stat.isDirectory()).catch(() => false);
//         if (!commitPathExists) {
//             console.error(`Error: Commit path "${commitPath}" does not exist or is not a directory.`);
//             return; // Exit the function if the path doesn't exist
//         }

//         const commitDirs = await fs.readdir(commitPath);

//         for(const commitDir of commitDirs) {
//             const commitFullPath = path.join(commitPath, commitDir);
            
//             // Check if commitFullPath is a directory before trying to read its contents
//             const isDirectory = await fs.stat(commitFullPath).then(stat => stat.isDirectory()).catch(() => false);
//             if (!isDirectory) {
//                 console.warn(`Warning: Skipping "${commitFullPath}" as it is not a directory.`);
//                 continue; // Skip if it's not a directory
//             }

//             const files = await fs.readdir(commitFullPath);

//             for(const file of files) {
//                 const filePath = path.join(commitFullPath, file);
                
//                 // Ensure it's a file, not a directory within the commit
//                 const isFile = await fs.stat(filePath).then(stat => stat.isFile()).catch(() => false);
//                 if (!isFile) {
//                     console.warn(`Warning: Skipping "${filePath}" as it is not a file.`);
//                     continue;
//                 }

//                 const fileContent = await fs.readFile(filePath);

//                 const params = {
//                     Bucket: S3_BUCKET,
//                     Key: `commits/${commitDir}/${file}`, // Correct S3 Key structure
//                     Body: fileContent,
//                     // Optional: Add ContentType if known, e.g., ContentType: 'application/octet-stream'
//                 };

//                 await s3.upload(params).promise(); // This line is correct for AWS SDK v2
//             }
//         }
//         console.log("Repository pushed to S3 successfully.");

//     }catch(err){
//         console.error("Error pushing repository:", err);
//     }
// }

// // Example usage (assuming this function is exported or called)
// // pushRepo();