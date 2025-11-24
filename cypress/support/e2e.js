// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
//import './commands'

// Este archivo se carga antes de cada spec
import './commands';

// Capturar la consola del browser y enviarla a node para guardar
Cypress.on('window:before:load', (win) => {
  const originalConsoleError = win.console.error;
  const originalConsoleLog = win.console.log;
  const send = (type, args) => {
    const text = `[${type}] ${Array.from(args).map(a => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ')}`;
    // envía al task que crea browser.log
    // Note: use setTimeout to ensure cy.task is available in test run context
    setTimeout(() => {
      // cy.task no está disponible directamente aquí; en tests usar cy.on('window:console') o llamar desde tests.
      // Este es un fallback para entornos donde se captura con eventos dentro de tests.
    }, 0);
  };

  win.console.log = function () {
    send('log', arguments);
    return originalConsoleLog.apply(this, arguments);
  };

  win.console.error = function () {
    send('error', arguments);
    return originalConsoleError.apply(this, arguments);
  };
});
