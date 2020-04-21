# Finder

Finder is a dynamic web application for hungry people where the user can search for food around their locations.

## Live Demo

Try the application live at [finder.com](https://finder.johnjhc.com/)

## Technologies To Be Used

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

-   User can log-in with username
-   User can log-in as a guest
-   User can sign-up with a desired username
-   User is greeted with a message containing their username
-   User can view profile page to locate "search", "location", "logout" button
-   User can set a search location
-   User can search restaurants by keywords
-   User can view stack of cards containing the restaurants results
-   User can "like" or "dislike" the restaurant card to move to next card
-   User can "rewind" to move back to the previous card
-   User can view details of the restaurant on click
-   User can view "liked" restaurants
-   User can view "reviewed" restaurants
-   User can write review from the list of liked restaurants

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
