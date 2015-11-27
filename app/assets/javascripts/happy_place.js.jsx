$(function() {

  // $(document).on("scroll", function () {
  //   debugger
  // });

  var App = React.createClass({

    onMapClick: function (coords) {
      this.props.history.pushState(null, "add", coords);
    },

    onPlaceClick: function (place) {
      this.props.history.pushState(null, "places/" + place.id);
    },

    render: function () {
      return <div>
              <header>
                <a className="logo" href="#/places">HappyPlace</a>
              </header>
              <main>
                <PlacesIndex children={this.props.children} onPlaceClick={this.onPlaceClick} onMapClick={this.onMapClick}/>
              </main>
              <footer className="group">
                <a href="#/about">About</a>
              </footer>
             </div>;
    }
  });

  var About = React.createClass({
    render: function () {
      return <p>
                <a href="#/places">HappyPlace</a> is an app written and maintained by <a href="http://lilykriopelle.com">Lily Riopelle</a>.
             </p>;
    }
  });

  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

                // <Route path="places" component={PlacesIndex}>
                // </Route>
  var routes = <Route path="/" component={App}>
                <Route path="add" component={PlaceForm}/>
                <Route path="places/:id" component={PlaceShow}/>
                <Route path="about" component={About}/>
               </Route>;

  React.render(<Router>
                {routes}
               </Router>,
               document.getElementById('content'));
});
