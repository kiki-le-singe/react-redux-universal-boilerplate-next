const inquirer = require('inquirer')
const fs = require('fs-extra')
const globby = require('globby')
const debug = require('debug')

const _debug = debug('app:bin:setup')

const cssnextFiles = [
  './*(webpack|src)/**/*.cssnext.*',
  './src/common/styles.cssnext',
  './postcss.config.cssnext.js',
]

const questions = [
  {
    type: 'confirm',
    name: 'setup',
    message: 'You will use SASS as CSS extension language 😉 . Do you wish to use CSSNEXT 😀 ? This choice is irreversible. Obviously you can install the project again or just use your version control system to discard changes in working directory.',
    default: false,
  },
]


function sass() {
  const sassDebug = debug('app:bin:setup:sass')

  return Promise.resolve()
    .then(() => {
      sassDebug('All CSSNEXT (styles, config) files are going to be deleted')
    })
    .then(() => {
      const file = './webpack-assets.json'

      fs.remove(file, (err) => {
        if (err) return sassDebug(err)
        return sassDebug(`${file} has been deleted`)
      })
    })
    .then(() => {
      globby(cssnextFiles)
        .then((paths) => {
          paths.forEach((filePath) => {
            fs.remove(filePath, (err) => {
              if (err) return sassDebug(err)
              return sassDebug(`${filePath} has been deleted`)
            })
          })
        })
    })
    .then(() => {
      sassDebug('Congratulations you are going to use SASS 👏 .')
    })
}

function cssnext() {
  const cssnextDebug = debug('app:bin:setup:cssnext')

  return Promise.resolve()
    .then(() => {
      cssnextDebug('All SASS (styles, config) files are going to be deleted')
    })
    .then(() => {
      globby(cssnextFiles)
        .then((paths) => {
          paths.forEach((filePath) => {
            const renamedPath = filePath.replace('.cssnext', '')

            try {
              fs.removeSync(renamedPath)
              cssnextDebug(`${renamedPath} has been deleted`)
            } catch (err) {
              cssnextDebug(err)
            }
          })
        })
    })
    .then(() => {
      globby(cssnextFiles)
        .then((paths) => {
          paths.forEach((filePath) => {
            const renamedPath = filePath.replace('.cssnext', '')

            fs.move(filePath, renamedPath, (err) => {
              if (err) return cssnextDebug(err)
              return cssnextDebug(`${filePath} has been renamed to ${renamedPath}`)
            })
          })

          const filePath = './src/common/views/AboutView/AboutView.scss'
          const renamedPath = './src/common/views/AboutView/AboutView.css'

          fs.move(filePath, renamedPath, (err) => {
            if (err) return cssnextDebug(err)
            return cssnextDebug(`${filePath} has been renamed to ${renamedPath}`)
          })
        })
    })
    .then(() => {
      cssnextDebug('Congratulations you are going to use CSSNEXT 👏 .')
    })
}

inquirer.prompt(questions)
  .then(answers => (answers.setup ? cssnext() : sass()))
  .then(() => {
    _debug('This setup (bin/setup.js) will self-destruct 💥 .')
  })
  .catch((err) => {
    _debug('Setup encountered an error.', err)
    process.exit(1)
  })
