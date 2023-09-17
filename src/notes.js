// 24. Practice - Share My Place...


// MOST IMP - I WON'T WRITE NOTES FOR THIS.
// I WILL CODE ALONG WITH MAX - AND WHEN I FIND SOMETHING WORTH WRITING - I WOULD MENTION THE LECTURE NAME & WRITE THE NOTES.


// We will create an app.
// We'll work with google maps - to allow users to get a current location of a user or to enter an address and then get the location of that address and display it on a map & then share that place with other users.


-----------------------------------------------------------------------------------------------------------


// 1. Setting Up the Project...

// Max has already made config and stuff ready to use.
// Babel is done and so on...
// Src folder has 2 .js files where we'll write our code.
// Those files are also integrated with webpack.
// It will build bundle of those files and paste it in scripts folder.
// We'll use google maps.

// Share place is the main file which we import in html.
// It will control buttons and so on.
// Approach with it would be OOP.

----------------------------------------------------------------------------------------------------------


// NOTES:

// Geolocation API has a very good browser support.
// It's a good practice to provide user with feedback when Something is Happening!
// Create other files regarding their fields so that there won't be any conjustion.
// Have fallbacks where there's no browser support... 

// Fallback for template for not supported on IE:
// The availablility of template tag is checked with if check = we create a new template - which IE won't support - thus we move to else{} = this is a better workaround.

"content" in document.createElement("template")
// This means the content property is available in template.
// With IN - we check if the object(template element) has the property on the left (content).
// Every DOM element is just an object.

document.importNode()
// This is how we use the content of a template and create a code based on it.
// We pass in true to make a Deep Clone.

// We set some things to null - so that we tell the browser & JS to clean them up...

// GOOGLE MAPS SDK DOCS LINK...
// https://developers.google.com/maps/documentation/javascript/overview

// Google Maps API with KEY:
{/* <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4&callback=initMap">
    defer
</script> */}

const GOOGLE_API_KEY = 'AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4';

// We can now use Google Maps Library.
// There is a limit to 28000 loads in the map so be careful or there will be charges...

// In the if check where we check !google = google is the keyword referencing the API.
// google.maps.Map() is a constructor function to which we pass the DOM element in which we wanna render the map...
// We can pass 2nd arg where we can configure the map - for eg: on which place it should be zoomed in at the beginning - we can set a center property - we can set our coordinates...
const map = new google.maps.Map(document.getElementById("map"), {
  center: this.coordinates,
  zoom: 16,
});

// We also have a marker constructor function on google sdk which will help us set a marker pin - it will take the coordinates and also it will take a map property in which we have to tell on which map does it have to show marker - here our const map..
new google.maps.Marker({
  position: this.coordinates,
  map: map,
});

// To find the address that was written in the form - we have to reach out to google's servers and translate user's entered address into coordinates..

// For getting the coords on an address - we must have google's geocoding API - we obtain it from google map platform.
// Geocoding API KEY:
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4

// The address will be the part of google geocoding url - we have to make sure that whitespace or special character should be translated into URL friendly encoding.
// For that we got = encodeURI function.
encodeURI(address);
// We pass in a string and we get a url-friendly string back..

// new Error() is a globally available constructor function in JS.

// Even the data extracted from the response - the coordinates data (Google specific thing) - could also fail without using error status code - without making into the if block where we check response error.
// So we check if the coordinates fail via if check.

// We look into official docs - we can see a display of a kind of result we would get if we extract the data of the response...
// There are various objects and properties but in there we have longitude and latitude properties - we wanna use that in our app.

// We can also do a reverse look up and pass in coords to get the address related..

// Geocoding API for reverse:
// https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4

// In the documentation for reverse geocoding - we gotta find the formatted address in the result.

shareLinkInputEl.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
// The location.origin gives us our current domain address - localhost.8080
// my-place is the name of the sub-folder which has an index.html file.
// ? = query parameter - it's basically some extra data we can add in the URL which we can read from on the other page we'll be loading..
// With address= we're setting address we get - we gotta use encodeURI to make it url friendly.. 
// We add & to add another optional query parameter to the URL - the lat and long.
// We encode all the data into the URL.

// We have the link - to share we copy it to the clipboard.

shareLinkInputEl.select()
// The select() selects all the things which are set to be selected - we don't have to go and do - CTRL+C...

navigator.clipboard.writeText(shareLinkInputEl.value);
// writeText() copies the value that it's pointed to and copies it automatically to the clipboard.

// Now when we copy the address to clipboard by sharing the place - we will paste it on the link of our current server.
// We want the link to open a new page - myplace.html - and also change/show the header to the name of the address we pasted..

new URL(location.href); 
// It's a built in constructor function or class in JS.
// location.href - it's the current location, url.
// This function creates an object with options for us to get information out of the url.

// searchParams are used to get decoded query argumnets contained in the URL.

// We convert an string to a number by adding + or parseFloat().