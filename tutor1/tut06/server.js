
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errHandler  = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3000;

app.use(logger);


//cross orgin resource sharing
const whitelist = ['https://www.google.com/','http://127.0.0.1:5500','http://localhost:3000']
const corsOption = {
    // the commented part has some errors so i go on with * but its dangerous bcz somene can stole thee data
    // the error was resolved 
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}


app.use(cors(corsOption))


app.use(express.urlencoded({extended:false}))

//build in middle ware for json
app.use(express.json())

//static serve file
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));


//routes
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'));


app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html'))
    {
        sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.accepts('json')) {
        sendFile({ error: '404 not found' });
    }else{
        res.type('txt').send('404 not found')
    }
})

app.use(errHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));