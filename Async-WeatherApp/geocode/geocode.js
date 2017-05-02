const request = require('request');

var geocodeAddress = function (address,callback) {
var encode = encodeURIComponent(address);
        //console.log(encode);
request({
    url:'http://maps.googleapis.com/maps/api/geocode/json?address='+encode,
    json: true
},function(error,response,body){
    if(error){
        callback('unable to connect to Google servers');
    }else if(body.status ==='ZERO_RESULTS'){
        callback('unbale to find address');
        
    }else if(body.status ==='OK'){
        callback(undefined, {
            address: body.results[0].formatted_address,
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng
        }) 
    }
    //console.log(body);
    //console.log(JSON.stringify(body, undefined, 2));
});
}
module.exports.geocodeAddress = geocodeAddress;