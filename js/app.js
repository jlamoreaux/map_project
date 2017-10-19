

// ViewModel
function AppViewModel() {
  var map;

  // Initializes Neighborhood Map
  function initMap() {
    var styles = [];

    // Creates a new map centered on Austin, TX
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.3074624, lng: -98.0335911},
      zoom: 13,
    });

    //var mapLocations = Model.locations;
  };
  initMap();
};

AppViewModel();
/*function Model() {

  // Locations that will be marked on the map
  var locations = [
    {title: '', location: {lat: , lng: }},
    {titel: '', location: {lat: , lng: }},
    {title: '', location: {lat: , lng: }},
    {titel: '', location: {lat: , lng: }},
    {title: '', location: {lat: , lng: }},
    {titel: '', location: {lat: , lng: }}
  ]
}
*/
