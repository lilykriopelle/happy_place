var Map = React.createClass({

  componentDidMount: function(){
    this.markers = [];

    navigator.geolocation.getCurrentPosition(function(pos) {
      var mapOptions = {
        center: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        },
        zoom: 16
      };

      this.createMap(mapOptions);
    }.bind(this));

    PlaceUIStore.addHoverListener(this._animate);
    PlaceStore.addCreateListener(this.replaceLocationMarker);
    PlaceStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    PlaceUIStore.removeHoverListener(this._animate);
    PlaceStore.removeCreateListener(this.replaceLocationMarker);
    PlaceStore.removeChangeListener(this._onChange);
  },

  replaceLocationMarker: function () {
    this.locationMark.setMap(null);
    var place = PlaceStore.all()[PlaceStore.all().length - 1];
    this.createMarker(place);
  },

  _animate: function() {
    this.markers.forEach(function(marker) {
      marker.setAnimation();
    });

    if (PlaceUIStore.hovered() && (typeof this.markers.findById(PlaceUIStore.hovered().id) !== "undefined")) {
      this.markers[this.markers.findById(PlaceUIStore.hovered().id)]
            .setAnimation(google.maps.Animation.BOUNCE);
    }
  },

  _onChange: function () {
    this.createMarkers();
  },

  createMap: function (mapOptions) {
    this.map = new google.maps.Map(map, mapOptions);

    var idle = this.props.idle;
    this.map.addListener('idle', function() {
      idle(this.getBounds());
    });
    this.createMarker();
    this.createMarkers();
  },

  createMarkers: function () {
    this.markers.forEach(function(marker){
      if (typeof PlaceStore.all().findById(marker.id) === "undefined") {
        marker.setMap(null);
        this.markers.splice(this.markers.indexOf(marker), 1);
      }
    }.bind(this));

    PlaceStore.all().forEach(function(place) {
      if (typeof this.markers.findById(place.id) === "undefined") {
        this.createMarker(place);
      }
    }.bind(this));
  },

  createMarker: function (place) {
    var center = place ? {lat: place.latitude, lng: place.longitude} : this.map.center;
    var id = place ? place.id : undefined;

    var mark;
    if (place) {

      var image = {
        url: window.EmojiImages[place.emoji],
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(30, 30)
      };

      mark = new google.maps.Marker({
        position: center,
        icon: image,
        map: this.map,
        id: id
      });

      this.markers.push(mark);
    } else {

      mark = new google.maps.Marker({
        position: center,
        map: this.map,
        id: id
      });

      var addPlace = this.props.addPlace;
      mark.addListener('click', function (marker) {
        addPlace(marker.latLng.lat(), marker.latLng.lng());
      });
      this.locationMark = mark;
    }
  },

  render: function () {

    return <div style={{ height: window.innerHeight - 100 }} id="map" ref="map">
      <Spinner/>
    </div>;
  }
});

var Spinner = React.createClass({
  render: function () {
    return (
      <div className="spinner">
        <div className="la-ball-pulse la-dark">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
});
