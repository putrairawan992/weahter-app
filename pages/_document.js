import Document, { Head, Main, NextScript } from "next/document";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { NEXT_WEATHER_GOOGLE_API_KEY } = publicRuntimeConfig;

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/static/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <meta name="msapplication-TileColor" content="#ecf0f5" />
          <meta name="msapplication-TileImage" content="/static/ms-icon-144x144.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#ecf0f5" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta name="apple-mobile-web-app-title" content="Klola Indonesia" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
