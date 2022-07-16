const mix = require("laravel-mix");
require("dotenv").config();
let ImageminPlugin = require("imagemin-webpack-plugin").default;

mix.webpackConfig({
    plugins: [
        new ImageminPlugin({
            //            disable: process.env.NODE_ENV !== 'production', // Disable during development
            pngquant: {
                quality: "95-100",
            },
            test: /\.(jpe?g|png|gif|svg)$/i,
        }),
    ],
});

mix.js("resources/js/website.js", "public/js")
    .js("resources/js/admin.js", "public/js")
    .react()
    // .sass('resources/sass/app.scss', 'public/css')
    .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);

mix.copy("resources/assets/images", "public/images", false);
