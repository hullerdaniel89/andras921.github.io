const yargs =require('yargs');
const axios = require('axios');

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
var encode = encodeURIComponent(argv.address);
var geocodeUrl = 'http://maps.googleapis.com/maps/api/geocode/json?address='+encode;

axios.get(geocodeUrl).then(function(response){
    if(response.data.status ==='ZERO_RESULTS'){
        throw new Error('Unable to find that address');
    }
    
    var lat = response.data.results[0].geometry.location.lat;
    var lon = response.data.results[0].geometry.location.lng;
    var weatherURL = 'https://api.darksky.net/forecast/966ae95d1f321766d424e4c096f09869/'+lat+','+lon;
    
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then(function(response){
    console.log(response);
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    
    
    console.log('Its currently: '+toCelsius(temperature)+' C. Its feels like: '+toCelsius(apparentTemperature)+' C.');
}).catch(function(err){
    if(err.code === 'ENOTFOUND'){
        console.log('unable to connect to API servers');       
    }else{
        console.log(err.message);
    }
    
});
//celsius converter
function toCelsius(farenheit){
      return  Math.round((farenheit-32)/9*5);
};