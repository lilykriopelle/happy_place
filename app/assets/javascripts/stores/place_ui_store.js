(function (root) {
  var _hovered;
  var _clicked;

  var HOVER_CHANGE_EVENT = "hover";

  root.PlaceUIStore = $.extend({}, EventEmitter.prototype, {

    addHoverListener: function (callback) {
      this.on(HOVER_CHANGE_EVENT, callback);
    },

    removeHoverListener: function (callback) {
      this.removeListener(HOVER_CHANGE_EVENT, callback);
    },

    addClickedListener: function (callback) {
      this.on(HOVER_CHANGE_EVENT, callback);
    },

    removeClickedListener: function (callback) {
      this.removeListener(HOVER_CHANGE_EVENT, callback);
    },

    changeClicked: function (place) {
      _clicked = place;
    },

    changeHovered: function (place) {
      _hovered = place;
    },

    hovered: function () {
      return _hovered;
    },

    clicked: function () {
      return _clicked;
    },

    dispatcherId: AppDispatcher.register(function(payload) {
      switch (payload.eventType) {
        case 'HOVER_CHANGED':
          PlaceUIStore.changeHovered(payload.place);
          PlaceUIStore.emit(HOVER_CHANGE_EVENT);
          break;
      }
    })

  });

})(this);
