const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const axios = require('axios')

var teste = {}

//handlebars
app.engine('handlebars', handlebars({
    defaultLaout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))
app.set('view engine', 'handlebars')

//bodyparser
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/resultado',(req,res)=>{
    res.render('admin/resultado',{data: teste})
})

app.post('/buscar',(req,res)=>{

    axios.get('https://goweather.herokuapp.com/weather/'+req.body.city).then((data)=>{
    //console.log(data.data)
    console.log('-----'+req.body.city)
    teste = data.data
    //console.log(teste)
    res.render('home',{data: data.data, city:req.body.city})
    }).catch((erro)=>{
        console.log(erro)
    })
})

app.listen(3001, console.log("ta rolando"))