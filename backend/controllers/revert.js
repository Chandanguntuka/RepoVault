const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

//wrarpping the fs functions in promises so that we can use async/await syntax for better readability
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), "my_repo");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await readdir(commitDir);//if there is no commit with the given commitID, it will throw an error which will be caught in the catch block
    //parent directory is the directory where the commit files will be copied to, which is the current working directory in this case
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      //copy and join the file path from the commit directory to the parent directory
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Commit ${commitID} reverted successfully!`);
  } catch (err) {
    console.error("Unable to revert : ", err);
  }
}

module.exports = { revertRepo };