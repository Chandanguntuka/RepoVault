const fs = require('fs').promises; // Use promises for async operations
const path = require('path');
const { s3, S3_BUCKET } = require('../config/aws-config');


async function pullRepo() {
    // console.log("Pulling repository from S3...");
    const repoPath = path.resolve(process.cwd(), 'my_repo');
    const commitPath = path.join(repoPath, 'commits');

    try{
     

        const data  = await s3.listObjectsV2({ Bucket: S3_BUCKET, Prefix: 'commits/' }).promise();

        const objects = data.Contents;

        for(const object of objects){
            const key = object.Key;
            const fileName = path.basename(key);
            const commitDir =path.join(
                commitPath,

            path.dirname(key).split('/').pop()// Get the commit directory name
            );
            // Create the commit directory if it doesn't exist
        //    const commitDirPath = path.join(commitPath, commitDir);
            await fs.mkdir(commitDir, { recursive: true });

            // Download the file from S3
            const params = {
                Bucket: S3_BUCKET,
                Key: key
            };

            const fileContent = await s3.getObject(params).promise();
          //  const filePath = path.join(commitDirPath, fileName);

            // Write the file to the local filesystem
            await fs.writeFile(path.join(repoPath,key), fileContent.Body);
        }
        console.log("Repository pulled from S3 successfully.");
    }catch(err){
        console.error("Error pulling repository:", err);
    }
}

module.exports = { pullRepo };

