// Set Locations
var starterLocations = [
  {
    title: "StoutHaus Coffee Pub",
    latLng: {lat: 30.2325888, lng: -97.811333},
    info:"Words"
  },
  {
    title: "Torchy's Tacos",
    latLng: {lat: 30.2509257, lng: -97.7542336},
    info: "More words"
  },
  {
    title: "Gordough's Big. Fat. Donuts.",
    latLng: {lat: 30.2495123, lng: -97.7548084},
    info: "Other words"
  },
  {
    title: "Lick Honest Ice Creams",
    latLng: {lat: 30.2555995, lng: -97.7626348},
    info: "Words Words Words"
  },
  {
    title: "St. Elmo Brewing Company",
    latLng: {lat: 30.2174538, lng: -97.7610629},
    info: "stuff"
  }
];


// Initializes Neighborhood Map
function initMap() {
  var styles = [];
  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var marker, i;

  // Creates a new map centered on Austin, TX
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {
          lat: 30.241253,
          lng: -97.773921
      },
      zoom: 13,
  });
  // Create Info Window
  var infowindow = new google.maps.InfoWindow();
  // Create markers for map locations
  for (var i = 0; i < appViewModel.locations().length; i++) {
    var location = appViewModel.locations()[i]
    // Gets info from location array in Model
    //var contentString = location.info();
    var position = location.latLng();
    var title = location.title();

    // Create a marker for each location
    marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      icon: 'img/marker.png',
      animation: google.maps.Animation.DROP,
      id: i,
      contentString : location.info()
    });

    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(marker.title, marker.contentString);
        infowindow.open(map, marker);
        marker.setAnimation(null);
        console.log(marker.contentString);
      }
    })(marker));

    location.marker = marker;


    //createList(locations[i]);
    //self.markers.push(marker);
    //marker.addListener()
  }
};

// Animate markers by making them bounce
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        //setTimeout(marker.setAnimation(null), 5000);
    }
};

// Hide marker on map
function hideMarker(marker) {
    marker.setMap(null);
};

// Show marker on map
function showMarker(marker) {
    marker.setMap(map);
};

// ViewModel
function AppViewModel() {
  var self = this;
  var markers = [];

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

  self.locations = ko.observableArray([
    new Location(starterLocations[0]),
    new Location(starterLocations[1]),
    new Location(starterLocations[2]),
    new Location(starterLocations[3]),
    new Location(starterLocations[4])
  ]);

  var locations = self.locations();

  // Filter locations
  self.filter = ko.observable();
  self.filteredLocations = ko.computed(function() {
    var filter = self.filter(),
      arr = [];
    if (filter) {
      ko.utils.arrayForEach(locations, function (location) {
        if (location.title().includes(filter)) {
          arr.push(location);
          showMarker(location.marker);
        };
        if (location.title().includes(filter) == false) {
          hideMarker(location.marker);
        }
        /*for(var i = 0; i < markers.length; i++){
          currentMarker = markers[i];
          console.log(ok);
          if (currenMarker.title.includes(filter) == false){
            location.marker.setVisibile(false);
            console.log(yes)
          }
        }*/
      });
    } else {
        arr = locations;
        for (i = 0; i < self.locations.length; i++){
          currentLocation = locations[i]
          //if (currentLocation.marker.map == null) {
            //showMarker(currentLocation.marker);
          //}
        }
    }
    return arr;
  });

  // Click Event for Locations List
  self.clickLocation = function(location){
    toggleBounce(location.marker);
    /*title = location.title();
    for(var i = 0; i < markers.length; i++){
      if (markers[i].title == title){

        console.log(location.title());
      }
    }*/
  };

};

var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);
