const request = require('request');

const fetchBreedDescription = (breedName, callback) => {
  request(`https://api.thecatapi.com/v1/breeds/search/?q=${breedName}`, (err, response, body) => {
    // console.log("response: ", response.statusCode); // testing output
    if (err || response.statusCode === 404) {
      callback(`There has been an error: 
      Response: ${response.statusCode}
      Error: ${err}`, null);
      // passinto callback error message and null description value
    }
    // parse into JSON object
    const data = JSON.parse(body);
    // console.log("JSON object returned: ", data); // testing output

    // if no data returned by search, inform user
    if (!data[0]) {
      // pass message to error, null description
      callback(`Sorry, no results found for ${breedName}.`, null);
      
    // pass null to error, description to results
    } else if (data[0].description) {
      callback(null, data[0].description);
    }
  });
};

module.exports = { fetchBreedDescription };
