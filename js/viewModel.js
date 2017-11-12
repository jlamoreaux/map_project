// Set Locations
var starterLocations = [
  {
    title: "StoutHaus Coffee Pub",
    latLng: {lat: 30.2325888, lng: -97.811333},
    info:"Words",
    fsData: {}
  },
  {
    title: "Torchy's Tacos",
    latLng: {lat: 30.2509257, lng: -97.7542336},
    info: "More words",
    fsData: {}
  },
  {
    title: "Gordough's",
    latLng: {lat: 30.2495123, lng: -97.7548084},
    info: "Other words",
    fsData: {}
  },
  {
    title: "Lick Honest Ice Creams",
    latLng: {lat: 30.2555995, lng: -97.7626348},
    info: "Words Words Words",
    fsData: {}
  },
  {
    title: "St. Elmo Brewing Company",
    latLng: {lat: 30.2174538, lng: -97.7610629},
    info: "stuff",
    fsData: {}
  }
];
var locations;

function showMenu() {
  var menu = document.getElementById('interface-content');
  if(menu.style.display == "none"){
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}
// Get's Foursquare API info for locations
function getFoursquare() {
  for (i = 0; i < locations.length; i++){
    // Make ajax request for each location
    (function(i){
      var url = 'https://api.foursquare.com/v2/venues/search?client_id=4UXAAMMSVWQCST32VAD333YU05UABMCSMMXPREUCP40ATKSA&client_secret=XWYFPXB1TXC35X4WO43DMRU5ITDV2NAL0LIY2VV3YZ32EKBI&v=20171101'
      var currentLocation = locations[i];
      var lat = locations[i].latLng().lat;
      var lng = locations[i].latLng().lng;
      url = url + "&ll=" + lat + "," + lng + "&query=" + locations[i].title();
      $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(data) {
          var fsData = data.response.venues[0];
          if(fsData.id) {
            currentLocation.fsID = fsData.id;
          } else {
            currentLocation.fsID = '';
          };
          if(fsData.name) {
            currentLocation.fsName = fsData.name;
          } else {
            currentLocation.fsName = currentLocation.title();
          };
          if(fsData.contact.formattedPhone) {
            currentLocation.fsPhone = fsData.contact.formattedPhone;
          } else {
            currentLocation.fsPhone = ''
          };
          if(fsData.location.formattedAddress){
            currentLocation.fsAddress = fsData.location.formattedAddress;
          } else {
            currentLocation.fsAddress = ''
          };
          if(fsData.url) {
            currentLocation.fsURL = fsData.url;
          } else {
            currentLocation.fsURL = '';
          }
          getFoursquareImage(currentLocation);
        },
        error: function(jqXHR) {
          alert("Unable to load data from Foursquare for " + locations[i].title());
          console.log(jqXHR);
        }
      });
    })(i);
        // Make ajax request for an image for each location
    function getFoursquareImage(currentLocation){
      var id = currentLocation.fsID;
      var prefix = 'https://api.foursquare.com/v2/venues/'
      var suffix = '/photos?client_id=4UXAAMMSVWQCST32VAD333YU05UABMCSMMXPREUCP40ATKSA&client_secret=XWYFPXB1TXC35X4WO43DMRU5ITDV2NAL0LIY2VV3YZ32EKBI&v=20171101'
      var url = prefix + id + suffix;
      $.ajax({
        async: true,
        url: url,
        dataType: 'json',
        success: function(data) {
          var imgData = data.response.photos.items[0].prefix + '100x100' + data.response.photos.items[0].suffix;
          currentLocation.fsImgURL = imgData;
          loadDescription(currentLocation);
        },
        error: function(jqXHR) {
          alert("Unable to load image from Foursquare for " + locations[i].title());
          console.log(jqXHR);
        }
      });
    }(i);
    //.done(function(){
      //return(fsData);
    /*})
    .fail(function(jqxhr, textStatus, error){
      var err = textStatus + ", " + error;
      console.log("Request Failed: " + err);
    });*/
  }
};

// Populate InfoWindow with foursquare data
// Modified version of solution found at https://stackoverflow.com/questions/3094032/how-to-populate-a-google-maps-infowindow-with-ajax-content
function loadDescription(location){
  var marker = location.marker;
  marker.contentString = '<div id="content"' + i + '>' + '<img src="' +
    location.fsImgURL + '" alt=' + location.title() + '>' + '<p>' +
    location.title() + '<br>' + location.fsPhone + '<br>' +
    location.fsAddress + '<br><a href="' + location.fsURL + '">' +
    location.fsURL + '</p></div>';
}

// Opens InfoWindow
function openInfoWindow(marker){
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent(marker.contentString);
  infowindow.open(map, marker);
}
// Initializes Neighborhood Map
function initMap() {
  var styles = [];
  var bounds = new google.maps.LatLngBounds();
  var marker, i;
  getFoursquare();
  // Creates a new map centered on Austin, TX
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {
          lat: 30.241253,
          lng: -97.773921
      },
      zoom: 13,
  });
  // Create Info Window
  //var infowindow = new google.maps.InfoWindow();
  // Create markers for map locations
  for (var i = 0; i < appViewModel.locations().length; i++) {
    var location = appViewModel.locations()[i]
    // Gets info from location array in Model
    //var contentString = location.info();
    var position = location.latLng();
    var title = location.title();
    /*var contentString = '<div id="content"' + i + '>' + '<img src="' +
      locations[i].fsImgURL + '" alt=' + locations[i].title() + '>' + '<p>' +
      locations[i].title() + '<br>' + locations[i].fsPhone + '<br>' +
      locations[i].fsAddress + '<br>' + locations[i].fsURL + '</p></div>';*/
    /*var node = document.createElement("ul");
    for(i = 0; i < content.length; i++){
      node.appendChild("li");
      node.appendChild(content[i]);
    }*/
    // Create a marker for each location
    marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      icon: 'img/marker.png',
      animation: google.maps.Animation.DROP,
      id: i
    });

    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        openInfoWindow(this)
        //infowindow.setContent(marker.contentString);
        //infowindow.open(map, marker);
        toggleBounce(this);
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

  locations = self.locations();

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
    openInfoWindow(location.marker);
    /*title = location.title();
    for(var i = 0; i < markers.length; i++){
      if (markers[i].title == title){

        console.log(location.title());
      }
    }*/
  }
};

var appViewModel = new AppViewModel();

ko.applyBindings(appViewModel);
