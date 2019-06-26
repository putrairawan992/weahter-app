const css = require("@zeit/next-css");
const Dotenv = require('dotenv-webpack');
const offline = require("next-offline");
const path = require('path');
const sass = require("@zeit/next-sass");
const withFonts = require('next-fonts');
const withPlugins = require('next-compose-plugins');

const { PHASE_PRODUCTION_BUILD } = require('next/constants');


module.exports = withPlugins([
    [css, {
      cssModules: false,
      distDir: "build"
    }],
    [withFonts, {
      enableSvg: true
    }],
    // [offline],
    [sass, {
      cssModules: false,
      cssLoaderOptions: {
        localIdentName: '[path]___[local]___[hash:base64:5]',
      },
      [PHASE_PRODUCTION_BUILD]: {
        cssLoaderOptions: {
          localIdentName: '[hash:base64:8]',
        },
      }
    }]
  ],{
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  },
  publicRuntimeConfig: {
    NEXT_WEATHER_API_URL : process.env.NEXT_WEATHER_API_URL ||  'https://api.openweathermap.org/data',
    NEXT_WEATHER_OPENWEATHER_API_KEY : process.env.NEXT_WEATHER_OPENWEATHER_API_KEY,
    NEXT_WEATHER_GOOGLE_API_KEY : process.env.NEXT_WEATHER_GOOGLE_API_KEY,
    NEXT_WEATHER_IPSTACK_API_KEY : process.env.NEXT_WEATHER_IPSTACK_API_KEY
  }
})
