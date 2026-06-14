const fs = require('fs').promises;
const path = require('path');



async function addRepo(filePath){
    // console.log("Adding file...");
    // Logic to add a file to the repository
    // This could involve copying the file to a specific directory,
    // updating a database, etc.
    const repoPath = path.resolve(process.cwd(), 'my_repo');
    const stagingPath = path.join(repoPath, 'staging');


    try{
     await fs.mkdir(stagingPath, { recursive: true });
      const  fileName =   path.basename(filePath);
      await  fs.copyFile(filePath,path.join(stagingPath, fileName));//without moving the file, we can just copy it to the staging area and keep the original file in its place
      
       console.log("File added to staging area:", fileName);

        // Copy the file to the staging area
        // await fs.copyFile(filePath, stagingFilePath);
        // console.log("File added to staging area:", stagingFilePath);
    }catch(err){
        console.error("Error adding file:", err);
        return;
    }
}

module.exports = {addRepo};