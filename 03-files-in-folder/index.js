const path = require('path');
const fsPromises = require('fs/promises');
const fs = require('fs');


const pathToFolder = path.join(__dirname, 'secret-folder');
async function showFiles(){

    try {
        const files = await fsPromises.readdir(pathToFolder, {withFileTypes: true});
        
        for (const file of files) {

           if (file.isFile()) {
                
                const extension = path.extname(file.name).slice(1);
                const fileName = path.basename(file.name, path.extname(file.name));
                const fullPath = path.join(pathToFolder, file.name);

                fs.stat(fullPath, (err, stats) => {

                    console.log(fileName + ' - ' + extension + ' - ' + (stats.size / 1024) + ' kb');

                });
            
           }
        }
    
    } catch (err) {
        console.error(err);
    }
}

showFiles();
