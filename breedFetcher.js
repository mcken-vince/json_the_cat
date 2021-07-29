const request = require('request');
const breed = process.argv.slice(2)[0];

request(`https://api.thecatapi.com/v1/breeds/search/?q=${breed}`, (error, response, body) => {
  // console.log("response: ", response.statusCode); // testing output
  if (error || response.statusCode === 404) {
    console.log(`There has been an error: 
    Response: ${response.statusCode}
    Error: ${error}`);
    process.exit();
  } 
  // parse into JSON object
  const data = JSON.parse(body);
  // console.log("JSON object returned: ", data); // testing output

  // if no data returned by search, inform user
  if (!data[0]) {
    console.log(`Sorry, no results found for ${breed}.`)

  // if data is returned, print it out
  } else if (data[0].description) {
    console.log(data[0].description);
  }
  
});