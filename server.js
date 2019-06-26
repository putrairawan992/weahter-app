const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('./i18n');
const compression = require("compression");
const { join } = require("path");
const { get, isEmpty } = require("lodash");
const requestIp = require('request-ip');
const routes = require("./routes");
const cookieSession = require('cookie-session')
const axios = require("axios");
const uCookies = require("universal-cookie");
const numeral = require('numeral');

require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const port = process.env.NEXT_WEATHER_PORT || process.env.PORT || 3000;

const app = next({ dev });
const handler = routes.getRequestHandler(app, ({req, res, route, query}) => {
                  app.render(req, res, route.page, query)
                })


const getCookieFromServer = (key, req) => {
  if (req) {
    const cookies = new uCookies(req.headers.cookie);
    return cookies.get(key)
  }
  return null;
};

// global.currentLang = get(nextI18next,'config.defaultLanguage');

app
  .prepare()
  .then(() => {
    const server = express();
    // server.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
    server.set("trust proxy", true);
    server.use(compression());
    server.use(nextI18NextMiddleware(nextI18next))
    server.use(
      cookieSession({
        name:'next-weather',
        keys: ["next-weather.app", "next-weather.id", "next-weather.xyz"],
        maxAge: 7 * 24 * 60 * 60 * 1000,
        overwrite: true
      })
    );
    server.use(requestIp.mw());

    server.get('*', (req, res) => {
      if (isEmpty(get(numeral, 'locales.id'))) {
          numeral.register('locale', 'id', {
              delimiters: {
                  thousands: '.',
                  decimal: ','
              },
              abbreviations: {
                  thousand: 'rb',
                  million: 'jt',
                  billion: 'm',
                  trillion: 'tr'
              },
              ordinal : function (number) {
                  return 'ke-';
              },
              currency: {
                  symbol: 'Rp '
              }
          });
      }
      if ( numeral.locale() != getCookieFromServer('next-i18next', req) )
        numeral.locale(getCookieFromServer('next-i18next', req));
      return handler(req, res)
    })

    server.get("/service-worker.js", (req, res) => {
      const filePath = join(__dirname, "build", req.originalUrl);
      app.serveStatic(req, res, filePath);
    });

    server.use(handler);


    server.listen(port, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + port);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
