const fs = require('fs').promises;
const path = require('path');


async function initRepo(){
    // console.log("Initializing repository...");
    const repoPath = path.resolve(process.cwd(), 'my_repo');
    const commitsPath = path.join(repoPath, 'commits');


    try{
        await fs.mkdir(repoPath, { recursive: true });//the path that gets created is the current working directory + 'my_repo'
        // in the nested path, we create the 'commits' directory inside 'my_repo' and other folders like 'staging' and 'objects' can be created in the future
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath,'config.json'),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );
        console.log("Repository initialized at:", repoPath);
    }catch(err){
        console.error("Error initializing repository:", err);
        return;
    }
}

module.exports = {initRepo};