const request = require('request');

var getWeather = function(lat,lon,callback){

    request({
        url:'https://api.darksky.net/forecast/966ae95d1f321766d424e4c096f09869/'+lat+','+lon,
        json:true
    }, function(error,response,body){
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                summary: body.daily.summary,
            });
        }else{
            callback('unable to fetch weather data');
        }//console.log(response);
    });
}
module.exports.getWeather = getWeather;