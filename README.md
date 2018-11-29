# NCKU CSIE Website
Build a better website for NCKU CSIE.

## Installation & Setup
0. Use **Unix-like** OS.
1. Get [Node.js](https://nodejs.org/en/) from [official website](https://nodejs.org/en/).
2. Clone from GitHub
    ```
    git clone https://github.com/toolbuddy/NCKU-CSIE-Website.git
    ```
3. Install dependencies
    ```
    npm install
    ```
4. Build
    - Setup **server** config files
        - **Create** server configuration files by running:
            ```
            npm run pre-build:server
            ```
        - **Filling-in** information required by `settings/server/config.js`.
            - Fill in `domainName` for **server domain name** information (**not required** in **develop** mode).
            - Fill in `protocol`, either `'http'` or `'https'` (**not required** in **develop** mode).
            - Fill in `port` for **server port** information (**not required** in **develop** mode).
            - Fill in `projectRoot` which is the **path** of your project root directory.
            - Fill in `host` and `staticHost` information (**not required** in **develop** mode).
    - Setup **database** config files
        - **Create** database configuration files by running:
            ```
            npm run pre-build:database
            ```
        - **Filling-in** information required by `settings/database/config.js`.
            - Fill in `username` and `password` for **database authentication** information (If you are a developer and need to connect to our database, please contact us).
            - Fill in `domainName` for **database domain name** information (If you are a developer and need to connect to our database, please contact us).
            - Fill in `protocol` for database (**not required** in **develop** mode).
            - Fill in `port` for **database server port** information (**not required** in **develop** mode).
            - Fill in `projectRoot` with `pwd` at project root directory.
        - Create database ORM files by running:
            ```
            npm run build:database
            ```
    - Build Server, HTML, CSS and ECMAScript files by running:
        ```
        npm run build
        ```

## Run
```
npm start
```

## Run in develop mode
```
npm run develop
```

### Develop Guide
This project use [Node.js](https://nodejs.org/en/) as backend infrastructure.
We use a lot of tools to help develop (ex. Pug (HTML5), Sass (css)), and we have setup some basic rule to make our coding style unified.
Make sure you follow our convention before you submit a pull request!
Here are a few standard:
- ECMAScript ( JavaScript )
    - Using pure ECMAScript to build everything on our server.
    - ECMAScript6 syntax mainly used. (Including backend)
    - Camel form naming style.
    - Other rules can be check by running following commands:
        - Frontend: `npm run lint:js`
        - Backend: `npm run lint:server`
    - Build ECMAScript files: `npm run build:js`
    - Build server: `npm run build:server`
- HTML
    - Using Pug template engine.
    - HTML5 tags only.
    - Semantic tags only, don't use tags like `div`, `i`, `b`, etc.
    - Other rules can be check by running `npm run lint:html`.
    - Build HTML files: `npm run build:html`
- CSS
    - Using Sass.
    - CSS3 syntax mainly used.
    - BEM naming convention:
        - Block: Control layout of its elements (structure).
        - Element: Control outfit of itself (skin).
        - Modifier: Modified style of specific element.
    - Other rules can be check by running `npm run lint:css`.
    - Build CSS files: `npm run build:css`
- Git
    - Using Git flow as develop standard.
    - Following branches are used:
        - `master`: Major stable version.
        - `release`: Ready to release version, need test to be proof stable.
        - `develop`: Develop version, not yet ready to publish.
        - `feature-*`: New feature, may or may not be merge back to `develop`.
        - `hotfix-*`: Quick fix for major version.

### Known issue in develop mode
- We use `webpack --watch` to monitor files change. Some Linux OS will complain about watching too many file, run the following command to fix this issue:
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
- We use `browser-sync` to run a dedicated develop server which automatically refresh browser each time files change. `browser-sync` take up port `3001` (always be server port + 1 by default, may change based on server port setting), and it will trigger `no-cors` for specific page (e.g. `/about/faculty/[id]`). Fixing this issue by changing the following code in file `settings/server/config.js`:
```
...
'host': {
    get () {
        return `${ config.protocol }://${ config.domainName }${
            config.port === '80' || config.port === '443' ?
                '' :
                `:${ config.port + 1 }` // -> originally `:${ config.port }`
        }`;
    },
},
...
```

## Long Term Goal
We are going to build a website which have following feature:
- Frequently updated information about this very department, every student has rights knowing what happened.
- Total information transparency, we are equally treated no matter which grade you are.
- Fancy UI build with WebGL, make student like it and want to contribute to it.
- Student forum with members of both undergraduate and graduate student, let fill this department with energy.

## Want to contribute?
Anyone can help make this project better!
We are currently a 16 members group, lead by [ProFatXuanAll](https://github.com/ProFatXuanAll).
Feel free to contact us if you have question.

## Team ProFatXuanAll
Special thanks for
- [lanhsincheng](https://github.com/lanhsincheng) for designing our website.
- [Rispolyv0n](https://github.com/Rispolyv0n), [kaeteyaruyo](https://github.com/kaeteyaruyo), [bbbchiu](https://github.com/bbbchiu), [Darkborderman](https://github.com/Darkborderman), [IsabelTseng](https://github.com/IsabelTseng), [f26401004](https://github.com/f26401004), [ya-sin](https://github.com/ya-sin), [k32367mdbf](https://github.com/k32367mdbf), [Kazumachi124170](https://github.com/Kazumachi124170), [melody825cat](https://github.com/melody825cat), [allen621115](https://github.com/allen621115), [laxative](https://github.com/laxative), [HMKRL](https://github.com/HMKRL) working on Frontend and Backend.
- [kevinbird61](https://github.com/kevinbird61) our mentor, also the founder of [Toolbuddy](https://github.com/toolbuddy) Organization.
