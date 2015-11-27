(function () {

  var _places = [];
  var CHANGE_EVENT = "change";
  var CREATE_CHANGE_EVENT = "create"

  window.PlaceStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _places.slice(0);
    },

    changed: function (eventType) {
      this.emit(eventType);
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    addCreateListener: function (callback) {
      this.on(CREATE_CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    removeCreateListener: function (callback) {
      this.removeListener(CREATE_CHANGE_EVENT, callback);
    },

    dispatcherId: (function () {
      AppDispatcher.register(function(payload) {
        switch (payload.eventType) {
          case 'RECEIVE_ONE_PLACE':
            var idx = _places.findById(payload.place.id);
            if (idx) {
              _places[idx] = payload.place;
            } else {
              _places.push(payload.place);
            }
            PlaceStore.changed(CREATE_CHANGE_EVENT);
            break;
          case 'RECEIVE_ALL_PLACES':
            _places = payload.places;
            PlaceStore.changed(CHANGE_EVENT);
            break;
        }
      });
    })(),

  });

})();
