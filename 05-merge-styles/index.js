const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist', 'bundle.css');


fs.access(projectFolder, async function(err) {
    if(!err) {
        await fsPromises.unlink(projectFolder, { recursive: true, force: true });
    }
        fs.writeFile(projectFolder, ' ', function(){});
        console.log('File bundle.css was created!');
    styleFiles();
});

async function styleFiles(){

    try {
        const files = await fsPromises.readdir(stylesFolder, {withFileTypes: true});
        
        for (const file of files) {
            const extension = path.extname(file.name)
           if (file.isFile() && extension == ".css") {
               const currentFile = path.join(stylesFolder, file.name);
               fs.readFile(currentFile, 'utf-8', function(err, data){
                fs.appendFile(projectFolder, data, function(){});
               });
           }
        }
    
    } catch (err) {
        console.error(err);
    }
}

