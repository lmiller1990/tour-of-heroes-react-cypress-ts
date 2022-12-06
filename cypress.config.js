import '@cypress/instrument-cra'
import {defineConfig} from 'cypress'
import cypressReplay from '@replayio/cypress'
const codeCoverageTask = require('@bahmutov/cypress-code-coverage/plugin')

const allConfig = (on, config) =>
  Object.assign(
    {},
    config,
    codeCoverageTask(on, config),
    cypressReplay(on, config),
  )

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  projectId: '7mypio',
  experimentalSingleTabRunMode: true,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    API_URL: 'http://localhost:4000/api',
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // workaround to replay browser crash
      // https://blog.hao.dev/fixing-cypress-errors-part-1-chromium-out-of-memory-crashes
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage')
        }

        return launchOptions
      })
      return allConfig(on, config)
    },
  },

  component: {
    setupNodeEvents(on, config) {
      // workaround to replay browser crash
      // https://blog.hao.dev/fixing-cypress-errors-part-1-chromium-out-of-memory-crashes
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage')
        }
        return launchOptions
      })
      return allConfig(on, config)
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      // here are the additional settings from Gleb's instructions
      webpackConfig: {
        // workaround to react-scripts 5 issue https://github.com/cypress-io/cypress/issues/22762
        devServer: {
          port: 3001,
        },
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            // application and Cypress files are bundled like React components
            // and instrumented using the babel-plugin-istanbul
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                  ],
                  plugins: [
                    'istanbul',
                    ['@babel/plugin-transform-modules-commonjs', {loose: true}],
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
})

/* eslint-disable @typescript-eslint/no-unused-vars */
