

// ViewModel
function AppViewModel() {
  var map;

  // Initializes Neighborhood Map
  function initMap() {
    var styles = [];

    // Creates a new map centered on Austin, TX
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.267153, lng: -97.7430608},
      zoom: 13,
    });

    //var mapLocations = Model.locations;
  };
  initMap();
};

AppViewModel();

function Model() {

  // Locations that will be marked on the map
  var locations = [
    {title: "StoutHaus Coffee Pub", location: {lat: 30.2325888, lng: -97.811333}},
    {titel: "Torchy's Tacos", location: {lat: 30.2509257, lng: -97.7542336}},
    {title: "Gordough's Big. Fat. Donuts.", location: {lat: 30.2495123, lng: -97.7548084}},
    {titel: "Lick Honest Ice Creams", location: {lat: 30.2555995, lng: -97.7626348}},
    {title: "St. Elmo Brewing Company", location: {lat: 30.2174538, lng: -97.7610629}}
  ]
}
