import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import { isEmpty } from 'lodash'

const defaultTitle = 'Next Weather - Check Weather in Your Area'
const defaultDescription = 'Check current weather in Your Area.'
const defaultOGURL = 'https://next-weather.herokuapp.com'
const defaultOGImage = ''

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{(props.title) ? `${props.title}` : defaultTitle }</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    {!isEmpty(props.keywords) &&
      <meta
        name="keywords"
        content={props.keywords}
      />
    }
    <meta property="og:url" content={props.url || defaultOGURL} />
    <meta property="og:title" content={(props.title) ? `${props.title} - ${defaultTitle}` : defaultTitle } />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    <meta name="twitter:site" content={props.url || defaultOGURL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image" content={props.ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="author" content="PT. Klola Indonesia" />
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
