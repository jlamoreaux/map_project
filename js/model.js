// Model
function Location(newLocation) {
    return {
        title: ko.observable(newLocation.title),
        latLng: ko.observable(newLocation.latLng)
    }
}
