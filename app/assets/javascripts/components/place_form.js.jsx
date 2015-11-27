var PlaceForm = React.createClass({

  getInitialState: function () {
    return { selected: undefined, location: "", note: "" };
  },

  setSelected: function (index, e) {
    this.setState({selected: index});
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var place = {
      latitude: parseFloat(this.props.location.query.lat),
      longitude: parseFloat(this.props.location.query.lng),
      location: this.state.location,
      note: this.state.note,
      emoji: Object.keys(window.Emoji)[this.state.selected]
    };

    ApiUtil.createPlace(place, function () {
      this.setState(this.getInitialState);
    }.bind(this));
  },

  handleLocationChange: function (e) {
    this.setState({location: e.currentTarget.value});
  },

  handleNoteChange: function (e) {
    this.setState({note: e.currentTarget.value});
  },

  render: function () {
    return (
            <form className="place-form">
              <a href="#/">X</a>
              <input id="location" type="text" placeholder="location" value={this.state.location} onChange={this.handleLocationChange}/>
              <ul className="group emoji-list">
                {Object.keys(window.Emoji).map(function(emojiName, index) {
                  var emojiImage = window.Emoji[emojiName];
                  return <div key={emojiName} className="emoji">
                          <li className={index === this.state.selected ? "selected" : ""} onClick={this.setSelected.bind(this, index)}>
                            {emojiImage}
                            <span className="border"></span>
                          </li>
                         </div>;
                }.bind(this))}
                </ul>
                <textarea placeholder="note" value={this.state.note} onChange={this.handleNoteChange}/>
                <button onClick={this.handleSubmit}>SUBMIT</button>
             </form>);
  }

});
