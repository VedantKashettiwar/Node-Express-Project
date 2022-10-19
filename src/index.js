const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser =require('body-parser');
const port = 8000

//middelware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//functions for fetching data
function writeFile(text){
    fs.writeFile('api.txt',text,(error)=>{
        console.log(error)
    })
};
function checkResponseStatus(res) {
    if(res.ok){
        return res
    } else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}


const templatePath =path.join(__dirname,'../templates');

//to set the view engine
app.set('view engine','hbs');
app.set('views',templatePath)

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/view',(req,res)=>{
    res.render('show')
})
app.post('/',(req,res)=>{
    res.render('msg')
    const dataObject = req.body
    const myJSON = JSON.stringify(dataObject);
    let prev = fs.readFileSync('api.json' ,'utf-8')
    prev = prev.slice(0, -1)
    prev =prev+','+myJSON+']'
    fs.writeFileSync('api.json',prev);
})
app.get('*',(req,res)=>{
    res.render('error',{'error':'404, Page not found'})
})
// For starting server at port no 8000
app.listen(port,()=>{
    console.log('Server Started');
})







