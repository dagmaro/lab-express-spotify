require('dotenv').config();

const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:

app.get('/', (req, res) => {
    res.render("index.hbs")
})
app.get("/artists-search", (req, res) => {
    spotifyApi
  .searchArtists(req.query.artists)
  .then(data => {
    let artistData = data.body.artists.items;
    req.render("artist-search-results.hbs", 
    {artistData})
    // ----> 'HERE'S WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));

})


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));

// });

// app.get('/artists', (req, res) => {
//   let artistsSearch = req.query.artist;

//   spotifyApi.searchArtists(artistsSearch)
//   .then(function(data) {
//     let artistsArray = data.body.artists.items;
//     res.render('artists', {artists: artistsArray})
//   }, function(err) {
//     console.error(err);
//   });
// });



