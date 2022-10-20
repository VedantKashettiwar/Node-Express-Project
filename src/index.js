const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser =require('body-parser');
const port = 8000

//middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


const templatePath =path.join(__dirname,'../templates');

let rID = ()=>{
    return Math.floor(Math.random() * 1000000000000);
}

//to set the view engine
app.set('view engine','hbs');
app.set('views',templatePath)

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/',(req,res)=>{
    res.render('msg')
    let dataObject = {
        'id':rID(),
        'fname':req.body.fname,
        'fphone':req.body.fphone,
        'femail':req.body.femail
    }
    const myJSON = JSON.stringify(dataObject);
    let prev = fs.readFileSync('api.json' ,'utf-8')
    prev = prev.slice(0, -1)
    prev =prev+','+myJSON+']'
    fs.writeFileSync('api.json',prev);
})

app.get('/view',(req,res)=>{
    let prev = fs.readFileSync('api.json' ,'utf-8')
    const parseObject = JSON.parse(prev);
    res.render('show',{parseObject}) 
})

app.get('*',(req,res)=>{
    res.render('error',{'error':'404, Page not found'})
})
// For starting server at port no 8000
app.listen(port,()=>{
    console.log('Server Started');
})







