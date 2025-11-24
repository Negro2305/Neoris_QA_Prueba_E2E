/*[describe('Flujo E2E de compra - Saucedemo', () => {

  beforeEach(() => {
    cy.fixture('user').then((user) => {
      cy.login(user.username, user.password); // Login con comando custom
    });
  });

  it('Debe completar una compra exitosamente', () => {
    // Agregar productos
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Ir al carrito
    cy.get('.shopping_cart_link').click();

    // Checkout
    cy.get('[data-test="checkout"]').click();

    // Completar formulario
    cy.get('[data-test="firstName"]').type('Juan');
    cy.get('[data-test="lastName"]').type('Perez');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('[data-test="continue"]').click();

    // Finalizar compra
    cy.get('[data-test="finish"]').click();

    // Validación final
    cy.contains('Thank you for your order!').should('be.visible');
  });
});*/


/// <reference types="cypress" />

describe('SauceDemo - Flujo compra E2E', () => {
  before(() => {
    // limpiar logs iniciales (sobrescribe)
    cy.task('writeFile', { file: 'cypress/logs/test.log', content: `=== Ejecutando pruebas: ${new Date().toISOString()} ===\n` });
    cy.task('writeFile', { file: 'cypress/logs/browser.log', content: `=== Browser logs: ${new Date().toISOString()} ===\n` });
  });

  it('Autenticarse, agregar 2 productos, checkout y confirmar orden', () => {
    cy.fixture('user').then(user => {
      // Capturar console messages del browser y enviarlas a node
      cy.on('window:before:load', (win) => {
        const origLog = win.console.log;
        const origError = win.console.error;
        win.console.log = function (...args) {
          // enviar a node
          cy.task('appendBrowserLog', { message: `[log] ${args.map(a => (typeof a==='object' ? JSON.stringify(a) : a)).join(' ')}` });
          return origLog.apply(this, args);
        };
        win.console.error = function (...args) {
          cy.task('appendBrowserLog', { message: `[error] ${args.map(a => (typeof a==='object' ? JSON.stringify(a) : a)).join(' ')}` });
          return origError.apply(this, args);
        };
      });

      // LOGIN
      cy.login(user.username, user.password);
      cy.logToFile('Login realizado');

      // Agregar dos productos
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.logToFile('Agregado: Sauce Labs Backpack');
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.logToFile('Agregado: Sauce Labs Bike Light');

      // Ir al carrito
      cy.get('.shopping_cart_link').click();
      cy.logToFile('Visualizar carrito');

      // Verificar que los 2 productos estén en carrito
      cy.get('.cart_item').should('have.length.at.least', 2).then(() => {
        cy.logToFile('Verificados 2 productos en carrito');
      });

      // Checkout
      cy.get('[data-test="checkout"]').click();
      cy.logToFile('Iniciar checkout');

      // Completar formulario de compra
      cy.get('[data-test="firstName"]').type('Juan');
      cy.get('[data-test="lastName"]').type('Perez');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.logToFile('Formulario completado');

      cy.get('[data-test="continue"]').click();
      cy.logToFile('Continue -> review');

      // Finalizar compra
      cy.get('[data-test="finish"]').click();
      cy.logToFile('Finish click');

      // Validación final: THANK YOU FOR YOUR ORDER
      cy.contains('Thank you for your order!').should('be.visible').then(() => {
        cy.logToFile('Mensaje de confirmación encontrado: THANK YOU FOR YOUR ORDER');
      });
    });
  });
});
