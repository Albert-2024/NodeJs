// const fs = require('fs'); // method 1 for files.. due to issue of call back next method is used

const fsPromise = require('fs').promises // imported /importing file

const path = require('path');

// method 2 to avoid call back hell

const fileOps = async() => {
    try{
        const data = await fsPromise.readFile(path.join(__dirname, /*'files', */ 'starter.txt'),
        'utf-8');
        console.log(data);

        await fsPromise.writeFile(path.join(__dirname,'Promisewrite.txt'),data);
        await fsPromise.appendFile(path.join(__dirname,'PromiseWrite.txt'),'\nhello world');
        await fsPromise.rename(path.join(__dirname,'PromiseWrite.txt'),(__dirname,'renamer.txt'));
        // unlink for deletion
        const newData = await fsPromise.readFile(path.join(__dirname, /*'files', */ 'renamer.txt'),
        'utf-8');
        console.log(newData);

    }catch(err){
        console.error(err);
    }
}

fileOps();


//method 1 for reading,writing in callback method 
/* fs.readFile(path.join(__dirname,'starter.txt'),'utf8' , (err, data) => {
    if (err) throw err;
    console.log('data');

    fs.writeFile(path.join(__dirname,'lore.txt') , 'nice to meet you' , (err) => {
    if (err) throw err;
    console.log('write complete');

        fs.appendFile(path.join(__dirname,'reply.txt') , '\n Exploring' , (err) => {
        if (err) throw err;
        console.log('append complete'); 
        
        
            

   
})


})
}) */

// method 2 for reading files 

// fs.readFile('./starter.txt','utf8' , (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// exit from uncaught errors 

// There is issue for callback hell so method 2



//vip
process.on('uncaughtException' , err => {
    console.error(`There is an uncaught error: ${err}`)
    process.exit(1);
})