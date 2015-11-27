window.ApiActions = {
  receiveOnePlace: function (place) {
    AppDispatcher.dispatch({
      eventType: 'RECEIVE_ONE_PLACE',
      place: place
    });
  },

  receiveAllPlaces: function (places) {
    AppDispatcher.dispatch({
      eventType: 'RECEIVE_ALL_PLACES',
      places: places
    });
  }
};
