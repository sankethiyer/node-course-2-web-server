const request = require('request');
    
//var API_KEY = 'AIzaSyBJy3L7d29UrITJ32wSzUO6OTI9f8fevO8';
var API_KEY = '9T7Ff9UGRUuxPtSncpOur5bMLQbpXVKm';

var geocodeAddress = (address, callback) => {
    var addressString = encodeURIComponent(address);
    request({
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=veera%20desai&key='+API_KEY,
        url: `https://www.mapquestapi.com/geocoding/v1/address?location=${addressString}&key=${API_KEY}`,
        json: true
    }, (error, response, body)=>{
        if (error) {
            callback('couldnt connect to mapquest servers');
        } else if(body.info.statuscode === 400){
            callback('couldnt fetch data for address provided');
        } else if(body.info.statuscode === 0){
            callback(undefined, {
                location : body.results[0].providedLocation.location,
                latitude : body.results[0].locations[0].latLng.lat,
                longitude : body.results[0].locations[0].latLng.lng
            });
        } else {
             console.log(error);
             console.log(response);
             
        }
    });
    
}

module.exports = {
    geocodeAddress
};
