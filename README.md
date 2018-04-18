# NCKU CSIE Website
Build a better website for NCKU CSIE

## Installation
* clone from GitHub - `git clone https://github.com/toolbuddy/NCKU-CSIE-Website.git`
* install dependencies - `npm install`

## Build
* run pre-build script - `npm run pre-build`
* fill in required configuration file
    * server configuration - `settings/server/config.js`
    * database configuration - `settings/database/config.js`
    * files mentioned about will not exist if you didn't run pre-build script

## Run
* `node server.js`

## Develop Guide
This project use [node.js](https://nodejs.org/en/) as backend infrastructure.
We use a lot of tools to help develop (ex. pug (HTML5), Sass (css)), and we have setup some basic rule to make our coding style unified.
Make sure you follow our convention before you submit a pull request!
Here are a few standard:
* Javascript
    * Using pure JavaScript
    * ECMAScript6 syntax mainly used
    * Camel form naming style
    * Other rules can be check by running following command:
        * frontend: `npm run eslint-frontend`
        * backend: `npm run eslint-backend`
* HTML
    * Using pug template engine
    * HTML5 tags only
    * Semantic tags only, don't use tags like `div`, `i`, `b`, etc.
    * Other rules can be check by running `npm run puglint`
* CSS
    * Using Sass
    * CSS3 syntax mainly used
    * BEM naming convention
        * Block: control layout of its elements (structure)
        * Element: control outfit of itself (skin)
        * Modifier: modified style of specific element
* Git
    * Using Git flow as develop standard
    * `master`: major stable version branch
    * `release`: ready to release version branch, need test to be proof stable
    * `develop`: develop version branch, not ready yet to publish
    * `feature-*`: new feature branch, may or may not be merge back to `develop`
    * `hotfix-*`: quick fix branch for major version

## Long Term Goal
We are going to build a website which have following feature:
* Frequently updated information about this very department
* Total information transparency
* Fancy UI build with WebGL and make student contribute to it
* Student forum with members of both undergraduate and graduate student

## Want to contribute?
Anyone can help make this project better!
We are currently a 16 members group, lead by [ProFatXuanAll](https://github.com/ProFatXuanAll).
Feel free to contact us if you have question.
