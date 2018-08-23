import React, { Component } from "react";

class ListPlaces extends Component {
  render() {
    return (
      <nav id="drawer">
        <div>
          <h1 className="App-title">Neighborhood Map</h1>
          <div className="search-places">
            <div className="search-places-bar">
              <div className="search-locations-input-wrapper">
                <input
                  type="text"
                  placeholder="Search location"
                  value={this.props.query}
                  onChange={event =>
                    this.props.onSearchChange(event.target.value)
                  }
                  tabIndex={this.props.showMenu ? "0" : "-1"}
                />
              </div>
            </div>

            <div className="search-locations-results">
              <ol className="locations-list" role="navigation">

              </ol>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default ListPlaces;