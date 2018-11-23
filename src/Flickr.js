export default function getFlickrImages(keyword) {

  const requestUrl = `https://api.flickr.com/services/rest/?
						&api_key=05be6248bf2f1e0f922813fb44b11191
						&method=flickr.photos.search
						&format=json&nojsoncallback=1
						&per_page=10
						&text=${keyword}`;
  // Use the Flickr API to retrieve pictures of the location
  return fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        throw response;
      } else return response.json();
    })
    .then(data => {
      
	  // Create an array to store information about the pictures and return it. Each picture is created as an object with key-value pairs and pushed into the array.
	  const photos = [];

      data.photos.photo.forEach(
        ({ farm, server, id, secret, title, owner }) => {
          let picture = {
            photoUrl: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
            originalUrl: `https://www.flickr.com/photos/${owner}/${id}/`,
            photoTitle: title ? title : keyword
          };

          photos.push(picture);
        }
      );

      return photos;
    })
    .catch(err => {
      console.log(err);
    });
}