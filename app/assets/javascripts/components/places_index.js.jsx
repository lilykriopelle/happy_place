var PlacesList = React.createClass({

  render: function () {
    return <ul className = "places-list">
            {this.props.places.map(function(place) {
              return <PlacesListIndexItem onPlaceClick={this.props.onPlaceClick} key={place.id} place={place}/>;
            }.bind(this))}
           </ul>;
  }
});

var PlacesListIndexItem = React.createClass({

  changeHovered: function (place) {
    UiActions.changeHovered(place);
  },

  handleClick: function (e) {
    e.preventDefault();
    this.props.onPlaceClick(this.props.place);
  },

  render: function () {
    return <li onMouseEnter={this.changeHovered.bind(this, this.props.place)}
               onMouseLeave={this.changeHovered.bind(this, undefined)}
               onClick={this.handleClick}
               key={this.props.place.id}> {this.props.place.location}</li>;
  }
});


var PlacesIndex = React.createClass({

  getInitialState: function () {
    return { places: PlaceStore.all(), onlyCurrentUser: false };
  },

  componentDidMount: function () {
    PlaceStore.addChangeListener(this._onChange);
    PlaceStore.addCreateListener(this._onChange);
  },

  fetchPlaces: function(bounds, callback) {
    ApiUtil.fetchPlaces(bounds, callback);
  },

  _onChange: function () {
    this.setState({places: PlaceStore.all()});
  },

  addPlace: function (lat, lng) {
    this.props.onMapClick({lat: lat, lng: lng});
  },

  render: function () {
    return <div className="group">
            <Map idle={this.fetchPlaces} addPlace={this.addPlace}/>
            <div className="right">
              <PlacesList onPlaceClick={this.props.onPlaceClick} places={this.state.places}/>
              {this.props.children}
            </div>
           </div>;
  }

});
