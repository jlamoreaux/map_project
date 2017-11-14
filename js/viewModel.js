var JSONLocations;
var locations;
var map;
var infowindow;

// Hamburger button
function showMenu() {
  var menu = document.getElementById("interface-content");
  if(menu.style.display == "none"){
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

// Get's Foursquare API info for locations
function getFoursquare() {
  for(i = 0; i < locations.length; i++){
    // Make ajax request for each location
    (function(i){
      var url = "https://api.foursquare.com/v2/venues/search?client_id=4UXAAMMSVWQCST32VAD333YU05UABMCSMMXPREUCP40ATKSA&client_secret=XWYFPXB1TXC35X4WO43DMRU5ITDV2NAL0LIY2VV3YZ32EKBI&v=20171101";
      var currentLocation = locations[i];
      var lat = currentLocation.latLng().lat;
      var lng = currentLocation.latLng().lng;
      url = url + "&ll=" + lat + "," + lng + "&query=" + locations[i].title();
      $.ajax({
        async: true,
        url: url,
        dataType: "json",
        success: function(data) {
          var fsData = data.response.venues[0];
          if(fsData.id) {
            currentLocation.fsID = fsData.id;
          } else {
            currentLocation.fsID = "";
          }
          if(fsData.name) {
            currentLocation.fsName = fsData.name;
          } else {
            currentLocation.fsName = currentLocation.title();
          }
          if(fsData.contact.formattedPhone) {
            currentLocation.fsPhone = fsData.contact.formattedPhone;
          } else {
            currentLocation.fsPhone = "";
          }
          if(fsData.location.formattedAddress){
            currentLocation.fsAddress = fsData.location.formattedAddress;
          } else {
            currentLocation.fsAddress = "";
          }
          if(fsData.url) {
            currentLocation.url = fsData.url;
          } else {
            currentLocation.url = "";
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
      var prefix = "https://api.foursquare.com/v2/venues/";
      var suffix = "/photos?client_id=4UXAAMMSVWQCST32VAD333YU05UABMCSMMXPREUCP40ATKSA&client_secret=XWYFPXB1TXC35X4WO43DMRU5ITDV2NAL0LIY2VV3YZ32EKBI&v=20171101";
      var url = prefix + id + suffix;
      $.ajax({
        async: true,
        url: url,
        dataType: "json",
        success: function(data) {
          var imgData = data.response.photos.items[0].prefix + "200x200" + data.response.photos.items[0].suffix;
          currentLocation.fsImgURL = imgData;
          loadDescription(currentLocation);
        },
        error: function(jqXHR) {
          alert("Unable to load image from Foursquare for " + locations[i].title());
          console.log(jqXHR);
        }
      });
    }
  }
};

// Populate InfoWindow with foursquare data
// Modified version of solution found at https://stackoverflow.com/questions/3094032/how-to-populate-a-google-maps-infowindow-with-ajax-content
function loadDescription(location){
  var marker = location.marker;
  var linkFoursquare = "http://foursquare.com/v/" + location.fsID + "?ref=4UXAAMMSVWQCST32VAD333YU05UABMCSMMXPREUCP40ATKSA";
  marker.contentString = '<div id="content"' + i + '>' + '<a href=' +
    linkFoursquare + '><img src="' +
    location.fsImgURL + '" alt=' + location.title() + '></a>' + '<p>' +
    location.title() + '<br>' + location.fsPhone + '<br>' +
    location.fsAddress + '<br><a href="' + location.url + '">' +
    location.url +
    '</p><br><img src="img/foursquare.png" alt="powered by foursquare" style="width:200px"></div>';
}

// Opens InfoWindow
function openInfoWindow(marker){

  infowindow.setContent(marker.contentString);
  infowindow.open(map, marker);
}

// Initializes Neighborhood Map
function initMap() {
  var styles = [];
  var marker, i;

  // Creates a new map centered on Austin, TX
  map = new google.maps.Map(document.getElementById("map"), {
      center: {
          lat: 30.241253,
          lng: -97.773921
      },
      zoom: 13,
  });
  infowindow = new google.maps.InfoWindow();
};

// Animate markers by making them bounce
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
};

// ViewModel
function AppViewModel() {
  var self = this;
  var markers = [];
  self.filter = ko.observable();
  self.locations = ko.observableArray();
  self.filteredLocations = ko.observable();

  // Filter locations
  self.filteredLocations = ko.computed(function() {
    var filter = self.filter(),
      arr = [];
    if (filter) {
      ko.utils.arrayForEach(self.locations(), function (location) {
        if (location.title().includes(filter)) {
          arr.push(location);
          showMarker(location.marker);
        };
        if (location.title().includes(filter) == false) {
          hideMarker(location.marker);
        }
      });
    } else {
        arr = self.locations();
        for(i = 0; i<self.locations().length; i++){
            showMarker(self.locations()[i].marker);
        }
    }
    return arr;
  });

  function loadJSON(callback) {
    var locationsURL = "https://api.myjson.com/bins/1cgy6r";
    $.ajax({
        async: true,
        url: locationsURL,
        dataType: "json",
        success: function(response) {
            JSONLocations = response.data.locations;
            loadLocations(JSONLocations);
            getFoursquare();
        },
        error: function(jqXHR) {
          alert("Unable to load locations");
          console.log(jqXHR);
        }
    });
  }

  function loadLocations(JSONLocations) {
    for (i = 0; i < JSONLocations.length; i++) {
        appViewModel.locations.push(new Location(JSONLocations[i]));
    }
    locations = self.locations();
    createMarkers();
  }


  function createMarkers() {
    // Create markers for map locations
      for (var i = 0; i < appViewModel.locations().length; i++) {
        var location = appViewModel.locations()[i]
        var position = location.latLng();
        var title = location.title();

        // Create a marker for each location
        marker = new google.maps.Marker({
          map: map,
          position: position,
          title: title,
          icon: "img/marker.png",
          animation: google.maps.Animation.DROP,
          id: i
        });
        google.maps.event.addListener(marker, "click", (function(marker) {
          return function() {
            openInfoWindow(this)
            toggleBounce(this);
          }
        })(marker));
        location.marker = marker;
    }
  }

  // Hide marker on map
  function hideMarker(marker) {
      marker.setMap(null);
  };

  // Show marker on map
  function showMarker(marker) {
      marker.setMap(map);
  };

  // Click Event for Locations List
  self.clickLocation = function(location){
    toggleBounce(location.marker);
    openInfoWindow(location.marker);
  }
  loadJSON();
};
ko.options.deferUpdates = true;     // Required to load AJAX responses correctly
var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);
