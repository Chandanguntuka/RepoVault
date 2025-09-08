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

// const fs = require('fs').promises; // Use promises for async operations
// const path = require('path');
// const { s3, S3_BUCKET } = require('../config/aws-config');


// async function pullRepo() {
//     console.log("Pulling repository from S3..."); // More descriptive log
//     const repoPath = path.resolve(process.cwd(), 'my_repo');
//     const commitBasePath = path.join(repoPath, 'commits'); // This is the base for all commits

//     try {
//         let allObjects = [];
//         let isTruncated = true;
//         let continuationToken = undefined;

//         // --- Handle S3 Pagination (CRITICAL for large buckets) ---
//         while (isTruncated) {
//             const params = {
//                 Bucket: S3_BUCKET,
//                 Prefix: 'commits/', // List all objects under the 'commits/' prefix
//                 ContinuationToken: continuationToken
//             };
//             const data = await s3.listObjectsV2(params).promise();
//             allObjects = allObjects.concat(data.Contents || []); // Add contents, handle empty Contents if no objects
//             isTruncated = data.IsTruncated;
//             continuationToken = data.NextContinuationToken;
//         }

//         if (allObjects.length === 0) {
//             console.log("No objects found in 'commits/' prefix in the S3 bucket.");
//             return; // Exit if nothing to pull
//         }

//         console.log(`Found ${allObjects.length} objects in S3.`);

//         for (const object of allObjects) {
//             const key = object.Key;

//             // Skip "folder" objects if S3 created them (e.g., key 'commits/commit123/')
//             // These typically have a ContentLength of 0
//             if (object.Size === 0 && key.endsWith('/')) {
//                 console.log(`Skipping S3 folder object: ${key}`);
//                 continue;
//             }

//             // Example key: commits/commit_id_xyz/file_name.txt
//             // We want to reconstruct: my_repo/commits/commit_id_xyz/file_name.txt

//             // The full local path for the file, based on the S3 key
//             const localFilePath = path.join(repoPath, key);

//             // Get the directory where this file should reside locally
//             const localFileDir = path.dirname(localFilePath);

//             // Create the local directory structure recursively
//             await fs.mkdir(localFileDir, { recursive: true });
//             console.log(`Created directory: ${localFileDir}`); // Added for debugging

//             // Download the file from S3
//             const params = {
//                 Bucket: S3_BUCKET,
//                 Key: key
//             };

//             console.log(`Downloading: ${key} to ${localFilePath}`); // Added for debugging
//             const fileContent = await s3.getObject(params).promise();

//             // Write the file to the local filesystem
//             // fileContent.Body might be a Buffer, Stream, or Blob depending on environment/SDK version
//             // For Node.js, it's typically a Buffer or Readable Stream
//             await fs.writeFile(localFilePath, fileContent.Body);
//         }
//         console.log("Repository pulled from S3 successfully.");

//     } catch (err) {
//         console.error("Error pulling repository:", err);
//     }
// }

// module.exports = { pullRepo };