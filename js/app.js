// ViewModel
function AppViewModel() {
  var map;
  var locations = model.locations;
  var markers = [];
  // Initializes Neighborhood Map
  function initMap() {
    var styles = [];

    // Creates a new map centered on Austin, TX
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.267153, lng: -97.7430608},
      zoom: 13,
    });

    // Create markers for map locations
    for (var i = 0; i < locations.length; i++) {
      // Gets info from location array in Model
      var position = locations[i].location;
      var title = locations[i].title;

      // Create a marker for each location
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      markers.push(marker);
      }
    };
  initMap();
};

var model = {

  // Locations that will be marked on the map
locations: [
    {title: "StoutHaus Coffee Pub", location: {lat: 30.2325888, lng: -97.811333}},
    {title: "Torchy's Tacos", location: {lat: 30.2509257, lng: -97.7542336}},
    {title: "Gordough's Big. Fat. Donuts.", location: {lat: 30.2495123, lng: -97.7548084}},
    {title: "Lick Honest Ice Creams", location: {lat: 30.2555995, lng: -97.7626348}},
    {title: "St. Elmo Brewing Company", location: {lat: 30.2174538, lng: -97.7610629}}
  ]
};

AppViewModel();
