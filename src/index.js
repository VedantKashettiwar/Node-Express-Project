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
    let dataObject = {
        'id':rID(),
        'fname':req.body.fname,
        'fphone':req.body.fphone,
        'femail':req.body.femail
    }
    const myJSON = JSON.stringify(dataObject);
    let prev = fs.readFileSync('api.json' ,'utf-8')
    if(prev == ''){
        prev ='['+myJSON+']'
        fs.writeFileSync('api.json',prev);
    }else{
        prev = prev.slice(0, -1)
        prev =prev+','+myJSON+']'
        fs.writeFileSync('api.json',prev);
    }

    res.render('msg')
})

app.get('/view',(req,res)=>{
    let prev = fs.readFileSync('api.json' ,'utf-8')
    const parseObject = JSON.parse(prev);
    res.render('show',{parseObject}) 
})
app.post('/detail',(req,res)=>{
    let detailObject = req.body.id
    let prev = fs.readFileSync('api.json' ,'utf-8')
    prev = JSON.parse(prev);
    let found = prev.find(a => a.id == detailObject)
    res.render('detail',{found}) 
})


app.get('*',(req,res)=>{
    res.render('error',{'error':'404, Page not found'})
})
// For starting server at port no 8000
app.listen(port,()=>{
    console.log('Server Started');
})







