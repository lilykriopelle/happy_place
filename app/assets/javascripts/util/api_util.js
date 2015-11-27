window.ApiUtil = {

  createPlace: function (place, callback) {
    $.ajax({
      url: 'api/places',
      type: 'POST',
      dataType: 'json',
      data: { place: place },
      success: function(place) {
        callback && callback();
        ApiActions.receiveOnePlace(place);
      }
    });
  },

  fetchPlaces: function (bounds, callback) {
    $.ajax({
      url: 'api/places',
      type: 'GET',
      dataType: 'json',
      data: {
        // only_current_user: true,
        bounds: ApiUtil.formatBounds(bounds)
      },
      success: function (places) {
        ApiActions.receiveAllPlaces(places);
      }
    });
  },

  formatBounds: function (mapBounds) {
    var northEast = mapBounds.getNorthEast();
    var southWest = mapBounds.getSouthWest();

    bounds = {};
    bounds.northEast = {
      lat: northEast.lat(),
      lng: northEast.lng()
    };
    bounds.southWest = {
      lat: southWest.lat(),
      lng: southWest.lng()
    };

    return bounds;
  }

};
