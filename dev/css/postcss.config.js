const cssnano = require('cssnano');

module.exports = {
    plugins: [
    // Fix all of flexbug's issues.
        'postcss-flexbugs-fixes',

        // Convert modern CSS into something most browsers can understand,
        // including auto-prefix. This plugin will read `browserlist` field
        // from `package.json` to get supported browsers. See
        // https://github.com/browserslist/browserslist for more information.
        'postcss-preset-env',

        // Use `normalize.css` from https://github.com/csstools/normalize.css
        // which enforce same style accross different browsers.
        // See https://github.com/csstools/normalize.css for more information.
        'postcss-normalize',

        // Optimize css file as small as possible for a production environment.
        // See https://cssnano.co/ for more information.
        cssnano(),
    ],
};
