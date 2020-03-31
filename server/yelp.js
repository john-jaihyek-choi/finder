const fetch = require('node-fetch');
const apiKey = "Bearer " + process.env.YELP_API_KEY;

function searchAllRestaurants(lat, long, term, location, radius) {
  return fetch((location
      ? `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&radius=${radius}&limit=30`
    : `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&radius=${radius}&term=${term}&limit=30`), {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.businesses
    })
}

function searchByCategories ( lat, long, categories){
  return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&categories=${categories}`, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(data =>{
      return data.businesses
    })
}

const getRestaurantDetails = function (yelpId) {
  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}`, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(details => {
      return getReviews(yelpId)
        .then(reviews => {
          details.reviews = reviews
          return details
        })
    })
}

const getReviews = function (yelpId) {
  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}/reviews`, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(data => { return data.reviews }
    )
}

module.exports = { getRestaurantDetails, searchAllRestaurants, searchByCategories};
