//const { PutObjectCommand } = require('@aws-sdk/client-s3');

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
        //we have multiple files in the commit directory, so we need to read all the files in the commit directory and upload them to S3
        // joining the commit path with the commit directory to get the full path of the commit directory
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

        //     const command = new PutObjectCommand({
        //     Bucket: S3_BUCKET,
        //      Key: `commits/${commitDir}/${file}`,
        //      Body: fileContent
        //      });

        //    await s3.send(command);

            
          }
      }
        console.log("Repository pushed to S3 successfully.");

    }catch(err){
        console.error("Error pushing repository:", err);
    }

}


module.exports = { pushRepo };
