const fetch = require('node-fetch');
const getRestaurantDetails = function (yelpId){

  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}`, {
    headers: {
      'Authorization': 'Bearer TljklZD_vCJIAGuMk_wgWfXyabofiHuFIO2LE1DKCATtNuYKSHnj26z8i8Q448jAOoLNAZvT2X0ocNI7ReTfM9bIQpAGf4F7HyGfdwDGK3lBYGEXcuScqMfYu_lzXnYx'
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
      'Authorization': 'Bearer TljklZD_vCJIAGuMk_wgWfXyabofiHuFIO2LE1DKCATtNuYKSHnj26z8i8Q448jAOoLNAZvT2X0ocNI7ReTfM9bIQpAGf4F7HyGfdwDGK3lBYGEXcuScqMfYu_lzXnYx'
    }
  } )
  .then(response => response.json())
  .then(data => { return data.reviews}
    )
}

const searchAllRestaurants = function (lat , long, term){

  return fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&term=${term}`, {
    headers: {
      'Authorization': 'Bearer TljklZD_vCJIAGuMk_wgWfXyabofiHuFIO2LE1DKCATtNuYKSHnj26z8i8Q448jAOoLNAZvT2X0ocNI7ReTfM9bIQpAGf4F7HyGfdwDGK3lBYGEXcuScqMfYu_lzXnYx'
    }
  })
    .then(response => response.json())
    .then(data =>{
      return data.businesses
    })

}

module.exports = { getRestaurantDetails,searchAllRestaurants};
