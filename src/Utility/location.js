// Utility methods for getting coords for an address..

export async function getCoordsFromAddress(address) {
  const urlAddress = encodeURI(address);
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4`
  );
  if (!response) {
    throw new Error("Failed to Fetch Coordinates! Please try again later...");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }

  // console.log(data);

  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

export async function getAddressFromCoords(coords) {
  const response =
    await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyDregJJ9rhEeA9ivahgq5OKR2lNqhUQUb4
`);
  if (!response) {
    throw new Error("Failed to Fetch Address! Please try again later...");
  }
  const data = await response.json();
  if (data.error_message) {
    throw new Error(data.error_message);
  }
  const address = data.results[0].formatted_address;
  return address;
}
