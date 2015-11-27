UiActions = {
  changeHovered: function (place) {
    AppDispatcher.dispatch({
      eventType: 'HOVER_CHANGED',
      place: place
    });
  }
};
