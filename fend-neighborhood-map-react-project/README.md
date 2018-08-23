# FEND Neighborhood Map Project

## Table of Contents

* [Project Overview](#project-overview)
* [Documentation](#documentation)
* [Instructions](#instructions)
* [Issues](#issues)
* [Contributing](#contributing)


### Project Overview

This project is a single page React application featuring a map of a neighborhood (the city of Buzau, Romania), using the Google Maps API. It includes several highlighted locations, third-party data about these locations (from Flickr), and a filter option (input field). The locations are listed in a sidebar which can be closed at the click of a button. The locations are displayed by default when the page is loaded. The list items and their respective markers can be clicked to bounce and display (a maximum of 10) photos fetched from the Flickr API in an infoWindow. The input field can be used to filter both the list view and the map markers. They are filtered by name.
The data APIs used in the project load asynchronously and notifications are displayed when the data can't be loaded.
This project was bootstrapped with Create React App.

### Documentation:

Create-react-app
https://github.com/facebook/create-react-app

Google Maps API
https://console.developers.google.com
https://cloud.google.com/maps-platform/

Making Google Maps work with React
https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/

Markers
https://developers.google.com/maps/documentation/javascript/markers

Info Windows
https://developers.google.com/maps/documentation/javascript/infowindows

Events
https://developers.google.com/maps/documentation/javascript/events

Public repository for code examples used in Udacity's Google Maps APIs course
https://github.com/udacity/ud864

Flickr API
https://www.flickr.com/services/api/


### Instructions

To view this project, you need to have Git Bash (on Windows) and Node installed.
Cd into the folder where you want to clone the project.
Run git clone in the terminal and add the link to the repository.
Cd into the newly created folder.
Run npm install.
Run npm start.
With your server running, visit the site http://localhost:3000/ in your browser.


### Issues

The API key is for development-purposes only and is watermarked. It displays an error in the console that the request quota for this API was exceeded.
There is also a warning about Will-change memory consumption being too high. And several warnings about multiple modules with names that only differ in casing.


### Contributing

This repository is my personal project for the FEND program at Udacity. Therefore, I most likely will not accept pull requests.