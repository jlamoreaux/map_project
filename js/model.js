// Model
function Location(newLocation){
  return {
    title : ko.observable(newLocation.title),
    latLng : ko.observable(newLocation.latLng),
    info: ko.observable(newLocation.info)
  };
};

// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'js/locations.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    var locations = JSON.parse(response);
    console.log(locations)
 });
}

init();
