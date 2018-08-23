import React, { Component } from "react";

class Place extends Component {
  /* When an item from the list is clicked, open the marker infowindow. */
  showInfo = () => {
    window.google.maps.event.trigger(this.props.location.marker, "click");
  };

  /* When an item from the list is hovered over, change the marker color. */
  mouseOver = () => {
    window.google.maps.event.trigger(this.props.location.marker, "mouseover");
  };

  mouseOut = () => {
    window.google.maps.event.trigger(this.props.location.marker, "mouseout");
  };

  render() {
    return (
      <li
        className="list-item"
        onClick={this.showInfo}
        onKeyPress={this.showInfo}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
        role="button"
        tabIndex={this.props.showMenu ? "0" : "-1"}
      >
        {this.props.location.title}
      </li>
    );
  }
}

export default Place;