const fs = require('fs');
const path = require('path');
const copy = require('fs/promises');
const constants = require('fs/promises');


const newFolder = path.join(__dirname, 'files-copy');
const pathToFolder = path.join(__dirname, 'files');


function callback(err) {
    if (err) throw err;
}

fs.access(newFolder, async function(err) {
    if(!err) {
        await copy.rmdir(newFolder, { recursive: true, force: true });
    }
    findFiles();
});



async function findFiles(){

    await copy.mkdir(newFolder, { recursive: true });

    try {
        const files = await copy.readdir(pathToFolder, {withFileTypes: true});
        
        for (const file of files) {

           if (file.isFile()) {
                let prevFilePath = path.join(pathToFolder, file.name);
                let newPath = path.join(newFolder, file.name);
                fs.copyFile(prevFilePath, newPath, constants.COPYFILE_EXCL, callback);
            
           }
        }

        console.log('Files have been copied');
    
    } catch (err) {
        console.error(err);
    }
}


