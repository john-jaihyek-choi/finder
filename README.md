# Finder

Finder is a web application which allows its users to search for food around their locations.

## Technologies To Be Used

- HTML5
- CSS3
- JavaScript
- React
- PostgreSQL
- Node.js
- Express.js
- jQuery
- Media Queries
- Bootstrap
- APIs

## Live Demo

Try the application live at [finder.com](https://finder.johnjhc.com/)

## Features

-   User can log-in with user name
-   User can log-in as a guest
-   User can sign-up with a desired user name
-   User is greeted with a message containing their user name
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
7. Edit your nginx default site configuration to reverse proxy the Express.js server
  ```shell
  cd /etc/nginx/sites-available
  sudo nano default
  ```
   - In the "server" code block, add this underneath the first location definition:
  ```shell
  location /api {
    proxy_pass http://127.0.0.1:3001;
  }

  location /socket.io {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
  }
  ```
   - Save your changes and exit
   - Link your default site to the sites-enabled directory (if not already done):
  ```shell
  sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
  ```
8. Start nginx
  ```shell
  sudo service nginx start
  ```
9. Transpile React components using Webpack
  ```shell
  npm run build
  ```
10. Start the Express.js server using the pm2 module
  ```shell
  sudo pm2 --name "finder" start "npm run start"
  ```
11. Open your default web browser and navigate to http://localhost:3000/ to see the result!
