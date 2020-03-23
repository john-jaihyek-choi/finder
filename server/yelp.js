const fetch = require('node-fetch');
const apiKey = process.env.YELP_API_KEY;

const getRestaurantDetails = function (yelpId){

  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}`, {
    headers: {
      'Authorization': apiKey
    }
  })
  .then(response => response.json())
  .then(details  => {
    return getReviews(yelpId)
    .then(reviews => {
      details.reviews = reviews
      return details
    })
  })
}

const getReviews = function (yelpId){
  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}/reviews`,{
    headers: {
      'Authorization': apiKey
    }
  } )
  .then(response => response.json())
  .then(data => { return data.reviews}
    )
}

function searchAllRestaurants  (lat , long, term){

  return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${term}&limit=5`, {
    headers: {
      'Authorization': apiKey
    }
  })
    .then(response => response.json())
    .then(data =>{
      return data.businesses
    })

}

module.exports = { getRestaurantDetails, searchAllRestaurants, getReviews};
