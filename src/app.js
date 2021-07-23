const request = require('request')
const geocode = require('./utils/geocode.js') 
  const forecast = require('./utils/forecast.js')
const path =require('path')
const express = require('express')
var hbs = require('hbs');
const app = express()

const port =process.env.PORT || 3000

/* console.log(__dirname)
console.log(path.join (__dirname,'../public')) */

//define path for express configure
const publicDirectory =path.join (__dirname,'../public')
const viewsPath = path.join(__dirname,'../templetes/views')
const partialsPath=path.join(__dirname,'../templetes/partials' )





// setup handlebars engine and view location
app.set('view engine' , 'hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath);


//setup static directory to server
app.use(express.static(publicDirectory))

app.get( '',(req,res)=>{
    res.render('index',{
        title:'weather forecast app',
        name:'andrew'


    })

} )

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'about me',
        name:'rahul singh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me please! buddy',
        name:'bhutani'
    })

})



app.get ('/weather',(req,res)=>{
    if(!req.query.address)
    {
     return res.send({
          error:"you must provide the address"
      })
    }

    geocode(req.query.address, (error,{ latitude,longitude,location}={})=>{ 

        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecast) =>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
               // forecast:'forecastData',
               forecast,
                location,
                address:req.query.address
            })

        })

    })





    
    
    
    
        
    })


app.get ('/products',(req,res)=>{
if(!req.query.search)
{
 return res.send({
      error:"you must provide the search term"
  })
}

    console.log(req.query.search)
    res.send({
        products:[]
    })



    
})
app.get ( '/help/*', (req,res) =>{
    res.render('404',{
        errorMessage:'help article not find'
    })

})
app.get('*',(req,res) =>{
    res.render('404',{
        errorMessage: '404 page not found',
        title:'rahull'
    })
})


app.listen(port ,() =>{
    console.log('server is on the port ' +port)

})