
//const request = require('request');
const yargs =require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const argv = yargs
    .options({
        a:{
            demand: true,
            alias:'address',
            describe: 'adress to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .argv;

geocode.geocodeAddress(argv.a, function(err,results){
    if(err){
        console.log(err);
    }else{
        console.log(results.address);
       
        weather.getWeather(results.lat,results.lng,function(err,weatherResult){
            if(err){
                console.log(err);
            }else{
                var toCelsius = Math.round((weatherResult.temperature-32)/9*5);
                console.log('Its currently: '+toCelsius+' Celsius');
                console.log('Daily summary: '+weatherResult.summary);
            }
        });
        
    }
});

//api key 966ae95d1f321766d424e4c096f09869
//https://api.darksky.net/forecast/966ae95d1f321766d424e4c096f09869/37.8267,-122.4233
