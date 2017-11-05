// Model
function Location(newLocation){
  return {
    title : ko.observable(newLocation.title),
    latLng : ko.observable(newLocation.latLng),
    info: ko.observable(newLocation.info)
  };
};
