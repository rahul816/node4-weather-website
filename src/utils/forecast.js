 const  request =require('request')
 const forecast = (latitude,longitude ,callback) =>{
       const url = 'http://api.weatherstack.com/current?access_key=228c887627ada54ae262dc30c0a1e40b&query=' + longitude +','+latitude + '&units=f'
    
       request ({url , json:true},(error,{ body})=>{
          
        if(error)
        {
           callback('unable to connect to weather app service' ,undefined)
        }
        else if(body.error)
        {
            callback('unable to find the location' , undefined)
        }
        else{
            console.log(body.current.weather_descriptions)
            callback(undefined ,body.current.weather_descriptions[0]+ '.  it is currently '+ body.current.temperature +'  degree out. there is ' +  body.current.precip   +' chance of rain . the humidity of today is ' + body.current.humidity +'%. today wind speed is'+body.current.wind_speed +'km/h.' )
        }

       })

 }


module.exports =forecast