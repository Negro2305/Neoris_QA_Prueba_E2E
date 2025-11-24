const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // tarea para escribir logs desde tests: cy.task('appendLog', {file, message})
      on('task', {
        appendLog({ file = 'cypress/logs/test.log', message }) {
          const p = path.resolve(file);
          fs.mkdirSync(path.dirname(p), { recursive: true });
          fs.appendFileSync(p, `${message}\n`);
          return null;
        },
        writeFile({ file = 'cypress/logs/test.log', content }) {
          const p = path.resolve(file);
          fs.mkdirSync(path.dirname(p), { recursive: true });
          fs.writeFileSync(p, content);
          return null;
        }
      });

      // intercept browser console (se ejecuta en node)
      on('task', {
        appendBrowserLog({ message }) {
          const p = path.resolve('cypress/logs/browser.log');
          fs.mkdirSync(path.dirname(p), { recursive: true });
          fs.appendFileSync(p, `${new Date().toISOString()} - ${message}\n`);
          return null;
        }
      });

      return config;
    },
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js'
  }
};
