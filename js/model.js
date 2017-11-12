// Model
function Location(newLocation) {
    return {
        title: ko.observable(newLocation.title),
        latLng: ko.observable(newLocation.latLng),
        info: ko.observable(newLocation.info),
        marker: {}
    };
};



// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
/*function loadJSON(callback) {
    $.ajax({
        async: true,
        url: locationsURL,
        dataType: 'json',
        error: alert('Unable to load locations'),
        success: function(response) {
            JSONLocations = response.data.locations;
            for (i = 0; i < JSONLocations.length; i++) {
                appViewModel.locations.push(new Location(JSONLocations[i]));
                console.log(JSONLocations[i]);
            }
        }
    });
}*/

/*function init() {
    loadJSON();
    //function(response) {
    // Parse JSON string into object
    //JSONLocations = JSON.parse(response.data);
    //});
}

init();*/
