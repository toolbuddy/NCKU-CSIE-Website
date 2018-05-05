# NCKU CSIE Website
Build a better website for NCKU CSIE

## Installation
* Clone from GitHub - `git clone https://github.com/toolbuddy/NCKU-CSIE-Website.git`
* Install dependencies - `npm install`

## Build
* Run pre-build script to setup config files - `npm run pre-build:settings`
    * Filling-in required configuration files
        * Server configuration - `settings/server/config.js`
        * Database configuration - `settings/database/config.js`
        * Files mentioned above will not exist if you didn't run the pre-build script
* Build CSS and ECMAScript files - `npm run build`

## Run
* `npm start`

## Run in develop mode
* `npm run develop`

## Develop Guide
This project use [node.js](https://nodejs.org/en/) as backend infrastructure.
We use a lot of tools to help develop (ex. Pug (HTML5), Sass (css)), and we have setup some basic rule to make our coding style unified.
Make sure you follow our convention before you submit a pull request!
Here are a few standard:
* ECMAScript ( JavaScript )
    * Using pure ECMAScript to build everything on our server.
    * ECMAScript6 syntax mainly used.
    * Camel form naming style.
    * Other rules can be check by running following commands:
        * Frontend: `npm run lint:js-frontend`
        * Backend: `npm run lint:js-backend`
    * Build ECMAScript files: `npm run build:js-frontend`
* HTML
    * Using Pug template engine.
    * HTML5 tags only.
    * Semantic tags only, don't use tags like `div`, `i`, `b`, etc.
    * Other rules can be check by running `npm run lint:pug`.
* CSS
    * Using Sass.
    * CSS3 syntax mainly used.
    * BEM naming convention:
        * Block: Control layout of its elements (structure).
        * Element: Control outfit of itself (skin).
        * Modifier: Modified style of specific element.
    * Other rules can be check by running `npm run lint:css`.
    * Build CSS files: `npm run build:css`
* Git
    * Using Git flow as develop standard.
    * Following branches are used:
        * `master`: Major stable version.
        * `release`: Ready to release version, need test to be proof stable.
        * `develop`: Develop version, not yet ready to publish.
        * `feature-*`: New feature, may or may not be merge back to `develop`.
        * `hotfix-*`: Quick fix for major version.

## Long Term Goal
We are going to build a website which have following feature:
* Frequently updated information about this very department, every student has rights knowing what happened.
* Total information transparency, we are equally treated no matter which grade you are.
* Fancy UI build with WebGL, make student like it and want to contribute to it.
* Student forum with members of both undergraduate and graduate student, let fill this department with energy.

## Want to contribute?
Anyone can help make this project better!
We are currently a 16 members group, lead by [ProFatXuanAll](https://github.com/ProFatXuanAll).
Feel free to contact us if you have question.

## Team ProFatXuanAll
Special thanks for
* [lanhsincheng](https://github.com/lanhsincheng) designing our website.
* [Rispolyv0n](https://github.com/Rispolyv0n), [kaeteyaruyo](https://github.com/kaeteyaruyo), [bbbchiu](https://github.com/bbbchiu), [Darkborderman](https://github.com/Darkborderman), [IsabelTseng](https://github.com/IsabelTseng), [f26401004](https://github.com/f26401004), [ya-sin](https://github.com/ya-sin), [k32367mdbf](https://github.com/k32367mdbf), [Kazumachi124170](https://github.com/Kazumachi124170), [melody825cat](https://github.com/melody825cat), [allen621115](https://github.com/allen621115) working on frontend and backend.
* [kevinbird61](https://github.com/kevinbird61) our mentor, also the founder of [Toolbuddy](https://github.com/toolbuddy) Organization.