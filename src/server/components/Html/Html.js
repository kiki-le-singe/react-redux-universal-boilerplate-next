import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

export default (content) => {
  const head = Helmet.rewind()
  const assets = webpackIsomorphicTools.assets()

  // Setup html page
  return `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Language" content="en" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        ${
          /* Styles will be presented in production with webpack extract text plugin */
          Object.keys(assets.styles).map(style =>
            `<link href="${assets.styles[style]}" media="screen, projection" rel="stylesheet" type="text/css" />`)
            .join('\n')
        }

        ${
          /* Styles will be presented in development mode
             I put all of the styles here to smoothen the flick */
          Object.keys(assets.styles).length === 0 ?
            `<style>${
              require('../../../common/styles/normalize.css')._style +
              require('../../../common/layouts/App/App.scss')._style +
              require('../../../common/views/Home/Home.scss')._style +
              require('../../../common/components/Hello/Hello.scss')._style
            }</style>` : ''
        }
      </head>
      <body>
        <div id="root">${content || ''}</div>

        <script type="text/javascript">
          ${`window.__INITIAL_STATE__=${serialize({})}`}
        </script>

        ${
          /* Reverse the order of scripts for accessing vendor.js first */
          Object.keys(assets.javascript).reverse().map(script =>
          `<script src="${assets.javascript[script]}"></script>`)
          .join('\n')
        }
        ${head.script.toString()}
      </body>
    </html>
  `
}
