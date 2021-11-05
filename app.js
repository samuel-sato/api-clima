const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const axios = require('axios')

axios.get('https://goweather.herokuapp.com/weather/Curitiba').then((data)=>{
    //console.log(data.data)
}).catch((erro)=>{
    console.log(erro)
})

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
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.get('/',(req,res)=>{
    res.render('home')
})

//app.get('/resultado',(req,res)=>{

  //  res.render('admin/resultado',{data})
//})

app.get('/buscar',(req,res)=>{
    axios.get('https://goweather.herokuapp.com/weather/'+req.body.city).then((data)=>{
    //console.log(data.data)
    console.log(axios.get('https://goweather.herokuapp.com/weather/'+req.body.city))
    res.render('admin/resultado', {data: data.data})

    }).catch((erro)=>{
    console.log(erro)
    })

})

app.listen(3000, console.log("ta rolando"))