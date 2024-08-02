# Finder

Finder is a dynamic web application for hungry people where the user can search for food around their locations.

## Update (08/02/2024):

Since July 2024, Yelp API have switched from free model to pay-to-use model. Along with it, the amount of information it provides were also affected. Some examples include - restaurant listing photos, reviews, etc. Due to this limitation, the app now lacks features such as multiple image view for detailed restaurant view and reviews view. Starting September 2024, the API will be shut down due to a complete pay-to-use model, and therefore the restaurant search feature won't be available.

References on the background behind Yelp's sudden shift from free to pay-to-use model:

- ["After 10 Years, Yelp Gave My App 4 Days"](https://www.observationalhazard.com/2024/07/after-10-years-yelp-gave-my-app-4-days_29.html)
- [Hacker News Thread](https://news.ycombinator.com/item?id=41104597)
- ["Yelp’s lack of transparency around API charges angers developers"](https://techcrunch.com/2024/08/02/yelps-lack-of-transparency-around-api-charges-angers-developers/)

## Live Demo

Try the application live at [finder.com](https://finder.johnjhc.com/)

## Technologies and Tools Used

- HTML5
- CSS3
- JavaScript
- React
- PostgreSQL
- Node.js
- Express.js
- Fetch
- Media Queries
- Bootstrap
- APIs

## Features

- User can log-in with username
- User can log-in as a guest
- User can sign-up with a desired username
- User is greeted with a message containing their username
- User can view profile page to locate "search", "location", "logout" button
- User can set a search location
- User can search restaurants by keywords
- User can view stack of cards containing the restaurants results
- User can "like" or "dislike" the restaurant card to move to next card
- User can "rewind" to move back to the previous card
- User can view details of the restaurant on click
- User can view "liked" restaurants
- User can view "reviewed" restaurants
- User can write review from the list of liked restaurants

## Preview

![](server/public/images/finder.gif)

#### Getting Started

1. Clone the repo

```shell
git clone https://github.com/john-jaihyek-choi/finder.git
```

2. Change directory to cloned folder

```shell
cd finder/
```

3. Install all dependencies with NPM

```shell
npm install
```

4. Start PostgreSQL database server

```shell
sudo service postgresql start
```

5. Create the database

```shell
createdb finder
```

6. Import the schema and dummy data

```shell
npm run db:import
```

7. Start the project

```shell
npm run dev
```

8. Open your default web browser and navigate to http://localhost:3000/ to see the result!
