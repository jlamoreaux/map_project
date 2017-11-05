// ViewModel
function AppViewModel() {
  var self = this;
  var map;
  var markers = [];

  // Set Locations
  var starterLocations = [
    {
      title: "StoutHaus Coffee Pub",
      latLng: {lat: 30.2325888, lng: -97.811333},
      info:""
    },
    {
      title: "Torchy's Tacos",
      latLng: {lat: 30.2509257, lng: -97.7542336},
      info: ""
    },
    {
      title: "Gordough's Big. Fat. Donuts.",
      latLng: {lat: 30.2495123, lng: -97.7548084},
      info: ""
    },
    {
      title: "Lick Honest Ice Creams",
      latLng: {lat: 30.2555995, lng: -97.7626348},
      info: ""
    },
    {
      title: "St. Elmo Brewing Company",
      latLng: {lat: 30.2174538, lng: -97.7610629},
      info: ""
    }
  ];

/*  var json = (function() {
        var json = null;
        $.ajax({
            'url': "js/locations.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })(); */

  locations = ko.observableArray([
    new Location(starterLocations[0]),
    new Location(starterLocations[1]),
    new Location(starterLocations[2]),
    new Location(starterLocations[3]),
    new Location(starterLocations[4])
  ]);

  // Filter locations
  self.filter = ko.observable();
  self.filteredLocations = ko.computed(function() {
    var filter = self.filter(),
      arr = [];
    if (filter) {
      ko.utils.arrayForEach(self.locations(), function (location) {
        console.log(location.title());
        if (location.title().includes(filter)) {
          arr.push(location);
          console.log(location.title());
        }
      });
    } else {
        arr = self.locations();
    }
    return arr;
  });

  // Click Event for Locations List
  self.clickLocation = function(){
    console.log('stuff');
  };

  // Initializes Neighborhood Map
  function initMap() {
    var styles = [];
    var largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // Creates a new map centered on Austin, TX
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 30.241253, lng: -97.773921},
      zoom: 13,
    });

    // Create markers for map locations
    for (var i = 0; i < locations().length; i++) {
      // Gets info from location array in Model

      var position = locations()[i].latLng();
      var title = locations()[i].title();
      // Create a marker for each location
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });
      //createList(locations[i]);
      markers.push(marker);
      //marker.addListener()
    }
  };
  /*function createList(location) {
      document.getElementById('location-list').innerHTML += '<li>' + location.title + '</li>'
  };*/
  initMap();
};

ko.applyBindings(AppViewModel);
