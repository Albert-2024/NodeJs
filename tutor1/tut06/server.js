
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
app.use(express.json())
app.use(express.static(path.join(__dirname,'/public')));
app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

const one = (req, res, next) => {
     console.log('one');
     next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('finished')
}

app.get('/chain(.html)?',[one,two,three]);


app.get('/hello(.html)?',( req,res,next )=>{
    console.log('atttempted hello');
    next()
},(req,res)=>{
    res.send("hello world")
})

app.get('/*',(req,res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));