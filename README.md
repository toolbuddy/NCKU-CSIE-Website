# NCKU CSIE Website

Build a better website for NCKU CSIE.

## Installation & Setup

0. Use **Unix-like** OS.
1. Get [Node.js](https://nodejs.org/en/) from [official website](https://nodejs.org/en/).
2. Clone from GitHub
    ```sh
    git clone https://github.com/toolbuddy/NCKU-CSIE-Website.git
    ```
3. Install dependencies
    ```sh
    npm install
    ```
4. Build
    - Setup **server** configuration files
        - **Create** server configuration files by running:
            ```
            npm run pre-build:server
            ```
        - **Filling-in** information required by `settings/server/config.js`.
            - Fill in `domainName` for **server domain name** information.
            - Fill in `protocol`, either `'http'` or `'https'`.
            - Fill in `port` for **server port** information.
            - Fill in `host` and `staticHost` information.
    - Setup **database** configuration files
        - **Create** database configuration files by running:
            ```sh
            npm run pre-build:database
            ```
        - **Filling-in** information required by `settings/database/config.js`.
            - Fill in `username` and `password` for **database authentication** information
            - Fill in `domainName` for **database domain name** information
            - Fill in `port` for **database server port** information (**not required** in **develop** mode).
            - Fill in `dialect` with database you use.
            - If you are a developer and need to connect to our database, please contact us.
    - Copy `tinymce` resources
        ```sh
        npm run pre-build:tinymce
        ```
    - Build Server, HTML, CSS and ECMAScript files by running:
        ```sh
        npm run build
        ```

## Run

```sh
npm start
```

## Run in develop mode

```sh
npm run develop
```

### Develop Guide

This project is run on [Node.js](https://nodejs.org/en/).
We use a lot of tools to help develop (ex. Pug (HTML5), Sass (css)), and we use linters to unify coding style.
Please check the following before you submit a pull request.

- ECMAScript ( JavaScript )
    - ES6+ syntax supported.
    - camelCase naming style.
    - Lint ECMAScript files with following commands:
        - Frontend: `npm run lint:js`
        - Backend: `npm run lint:server`
    - Build ECMAScript files: `npm run build:js`
- HTML
    - Using Pug template engine.
    - HTML5 semantic tags only (don't use tags like `div`, `i`, `b`, etc).
    - Lint Pug files by running `npm run lint:html`.
    - Build HTML files: `npm run build:html`
- CSS
    - Using Sass.
    - CSS3+ syntax supported.
    - BEM naming convention:
        - Block: Control layout of its elements (structure).
        - Element: Control outfit of itself (skin).
        - Modifier: Modified style of specific element.
    - Lint SCSS files by running `npm run lint:css`.
    - Build CSS files: `npm run build:css`
- Git
    - Using Git flow as development standard.
    - Following branches are used:
        - `master`: Major stable version.
        - `release`: Ready to release version, need test to be proof stable.
        - `develop`: Develop version, not yet ready to publish.
        - `feature-*`: New feature, may or may not be merge back to `develop`.
        - `hotfix-*`: Quick fix for major version.

### Known issue in develop mode

- We use `webpack --watch` to monitor files change. Some Linux OS will complain about watching too many file, run the following command to fix this issue:

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Long Term Goal

We are going to build a website which have following feature:

- Frequently updated information about NCKU CSIE.
- Fancy UI to attract students to contribute.

## Want to contribute?

Anyone can help us to make this project better!
Feel free to contact us if you have question.

## Team ProFatXuanAll

Special thanks for

- Designer: [lanhsincheng](https://github.com/lanhsincheng) and [Cindy](https://www.facebook.com/cindy461022).
- Active Developer: [ProFatXuanAll](https://github.com/ProFatXuanAll), [kaeteyaruyo](https://github.com/kaeteyaruyo), [AmyLin0210](https://github.com/AmyLin0210), [Rispolyv0n](https://github.com/Rispolyv0n).
- Participant: [danielian1121](https://github.com/danielian1121), [ya-sin](https://github.com/ya-sin), [yellow951321](https://github.com/yellow951321), [aqwefghnm](https://github.com/aqwefghnm), [eecheng87](https://github.com/eecheng87), [Kazumachi124170](https://github.com/Kazumachi124170), [k32367mdbf](https://github.com/k32367mdbf), [wang0630](https://github.com/wang0630), [Darkborderman](https://github.com/Darkborderman).
- Founder of [Toolbuddy](https://github.com/toolbuddy) Organization: [kevinbird61](https://github.com/kevinbird61)
