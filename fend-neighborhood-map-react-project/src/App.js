import React, { Component } from "react";
import "./App.css";
import ListPlaces from "./ListPlaces";
import redMarker from "./icons/spotlight-poi2.png";
import blueMarker from "./icons/spotlight-poi2-blue.png";

class App extends Component {
  state = {
    loaded: false,
    map: {},
    locations: [
      {
        title: "Aurora Shopping Mall",
        position: { lat: 45.16309, lng: 26.817799 },
        keywords: "Aurora Mall Buzau"
      },      
	  {
        title: "Buzau Town Hall",
        position: { lat: 45.153654, lng: 26.820831 },
        keywords: "Palatul Comunal Buzau"
      },      
	  {
        title: "Crang Park",
        position: { lat: 45.148106, lng: 26.803784 },
        keywords: "Crang Buzau"
      },
      {
        title: "Marghiloman Park",
        position: { lat: 45.148669, lng: 26.842462 },
        keywords: "Marghiloman Buzau"
      },
      {
        title: "Kaufland",
        position: { lat: 45.161906, lng: 26.820601 },
        keywords: "Kaufland"
      },
      {
        title: "Tineretului Park",
        position: { lat: 45.159968, lng: 26.830113 },
        keywords: "Tineretului Buzau"
      }
    ],
    filteredLocations: [],
    showMenu: true,
    menuClassName: "open",
    query: "",
    infowindow: {}
  };

  // Solution (Making Google Maps work with React): https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
  componentDidMount() {
    window.googleMapsLoaded = this.googleMapsLoaded;
    this.loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrz0AbNy7M6a1rzBUIHdlDPTh8QZfPr8A&callback=googleMapsLoaded"
    );
	// This appends the map API to the DOM.
  }

  // Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
  loadError = oError => {
    throw new URIError(
      "The script " + oError.target.src + " didn't load correctly."
    );
  };

  loadJS = src => {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = this.loadError;
    ref.parentNode.insertBefore(script, ref);
  };

  // We wait for the callback function of googleMaps, then set the state to loaded so components can render.
  googleMapsLoaded = () => {
    this.setState(() => ({ loaded: true }), () => this.initializeMap());
  };

  // Once google maps is loaded, we fetch the map div and inject the map into it. And after that we start to filter the locations by going through each one and adding a marker to it.
  initializeMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: { lat: 45.15, lng: 26.82 }
    });

    // We create a single infoWindow so that only one is open at once.
	const infowindow = new window.google.maps.InfoWindow();

    this.setState(() => ({ map, infowindow }), () => this.filterLocations(""));
  };

  filterLocations = query => {
	// We clear the markers each time filterLocations runs, then filter them for instant feedback.
    this.state.filteredLocations.forEach(location => {
      location.marker.setMap(null);
    });

	// Without a filter, filteredLocations are just locations. The query is set to an empty string ('') upon initialization so it will grab the full list.
    const filteredLocations = [];

    this.state.locations.forEach((location, index) => {
      if (location.title.toLowerCase().indexOf(query) > -1) {
        const marker = new window.google.maps.Marker({
          position: location.position,
          map: this.state.map,
          title: location.title,
          tabIndex: "1",
          role: "button",
          icon: redMarker,
          id: index,
          keywords: location.keywords
        });

        const { infowindow, map } = this.state;

        marker.addListener("click", () => {

          // Check to make sure the infowindow is not already opened on this marker. Source (course material): https://github.com/udacity/ud864/blob/master/Project_Code_13_DevilInTheDetailsPlacesDetails.html
          if (infowindow.marker !== marker) {
            infowindow.setContent("");
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener("closeclick", function() {
              infowindow.marker = null;
            });


            map.setCenter(marker.getPosition());
          }

          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 2100);
        });

        marker.addListener("mouseover", function() {
          marker.setIcon(blueMarker);
        });
        marker.addListener("mouseout", function() {
          marker.setIcon(redMarker);
        });

		// Create the list of locations.
        filteredLocations.push({
          ...location,
          marker
        });
      }
    });

    this.setState({ filteredLocations });
  };

  // The input from the ListPlaces component calls this function on change, triggering the filterLocations method with a parameter.
  onSearchChange = query => {
    this.setState(() => ({ query }), () => this.filterLocations(query));
  };

  // Open and close the menu on click by changing its className. This is also used to add padding to the map so it doesn't overlap.
  toggleMenu = () => {
    // Solution: https://stackoverflow.com/a/48394541
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }));
    this.setState({ menuClassName: this.state.showMenu ? "close" : "open" });
  };

  render() {
    return this.state.loaded ? (
      <div className="App">
        <div id="sidebar" className={this.state.menuClassName}>
          <a
            id="menu"
            className="menu-button"
            role="button"
            onClick={this.toggleMenu}
            onKeyPress={this.toggleMenu}
            tabIndex="0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
            </svg>
          </a>
          <ListPlaces
            component={ListPlaces}
            locations={this.state.locations}
            showMenu={this.state.showMenu}
            role="complementary"
            onSearchChange={this.onSearchChange}
            filteredLocations={this.state.filteredLocations}
          />
        </div>
        <main
          id="maincontent"
          role="main"
          className={this.state.showMenu ? "" : "padding"}
        >
          <section id="map-container">
            <div id="map" role="application" aria-label="Map with locations" />
          </section>
        </main>
      </div>
    ) : (
      <div>Loading Google Maps...</div>
    );
  }
}

export default App;