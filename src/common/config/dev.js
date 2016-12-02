import projectConfig from '../../../config'

const { SERVER_HOST, SERVER_PORT } = projectConfig

module.exports = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Redux Universal Boilerplate',
    titleTemplate: 'React Redux Universal Boilerplate - %s',
    meta: [
      { name: 'description', content: 'Another react universal starter boilerplate.' },
    ],
  },
}
