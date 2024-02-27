# Dancing with the Fans App

## Overview

This is a web application designed for mobile use and exclusive to fans of the competition television series Dancing with the Stars airing every fall on [ABC](https://abc.com) and [Disney+](https://disneyplus.com). The show follows celebrities as they are paired up with professional dancers and compete for judges' points and audience votes over the course of several weeks to crown a winning team.

The app serves as an extensive database for every season, tour, dance, team, celebrity, professional dancer, etc. seen on the show. Users can create/customize their own DWTS profile by liking their favorite pros/teams/dances and find fans with similar favorites as them. The search portal with precise sorting/filtering is the app's core feature but some additional features include scoring dances, voting in polls, and viewing a plethora of statistics about the show.

## Development

This app is a full-stack progressive web app built on the PERN (PostgreSQL, Express, React, Nodejs) stack. The database stores thousands of entries ranging from data as minimal as number of seasons to as extensive as individual scores for every dance. Each entity has its own controller on the app's server where CRUD operations are used to handle adding, fetching, updating, and deleting data from the database.

A Firebase Cloud Storage bucket is used to store images used within the app. Users are able to upload their own profile pictures from their devices and hundreds of images can be seen correlating to the teams, celebrities, and professional dancers in the app.

The app is currently deployed on an AWS EC2 instance using an NGINX web server.

For more information about the app and development process, visit the app's documentation site [here](https://perezsamantha.github.io/dwts-app/).

### Technologies Used

-   [React](https://react.dev/) - JavaScript library for building web and native user interfaces using components
-   [Redux](https://react-redux.js.org/) - Advanced state management library for JavaScript applications
-   [Material UI](https://mui.com/) - Reusable and customizable component library that provides building blocks for React applications
-   [NodeJS](https://nodejs.org/en/about/) - JavaScript runtime environment
-   [ExpressJS](https://expressjs.com/) - Flexible NodeJS framework used to build web applications and APIs
-   [PostgreSQL](https://www.postgresql.org/) - Relational database management system with focus on SQL compliance and extensibility
-   [OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - Protocol used for authentication and authorization through Google
-   [Firebase](https://firebase.google.com/docs/storage) - User-generated content storage system through Google Cloud Storage
-   [Multer](https://www.npmjs.com/package/multer) - Body parsing middleware used to handle uploading images
-   [Nodemailer](https://nodemailer.com/) - NodeJS module used for sending emails via SMTP

## Credit

All credit surrounding app concepts relating to 'Dancing with the Stars' and images within the app corresponding to cast members belongs to ABC Network, BBC Worldwide, and Disney+. No copyright was intended.
