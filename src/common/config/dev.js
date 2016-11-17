module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.NODE_PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'React Starter',
    titleTemplate: 'React Starter - %s',
    meta: [
      { name: 'description', content: 'Another react universal starter boilerplate.' },
    ],
  },
}
