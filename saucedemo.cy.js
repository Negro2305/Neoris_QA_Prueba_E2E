describe('Flujo E2E de compra - Saucedemo', () => {

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
});
