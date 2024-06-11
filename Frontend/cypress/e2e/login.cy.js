// cypress/e2e/login.spec.js
describe('Login Tests', () => {
    const username = 'janou';
    const password = 'meh7';
  
    beforeEach(() => {
      cy.visit('https://agreeable-bush-0efb41003.5.azurestaticapps.net/#/');
    });
  
    it('should fail login with invalid credentials', () => {
      cy.get('input[placeholder="Your username"]').type('invalidUser');
      cy.get('input[placeholder="Your password"]').type('invalidPass');
      cy.get('button[type="submit"]').contains('Login').click();
  
      // Check for the notification
      cy.get('.mantine-Notification-root').should('contain', 'Invalid username or password');
    });
  
    it('should login with valid credentials', () => {
      cy.get('input[placeholder="Your username"]').type(username);
      cy.get('input[placeholder="Your password"]').type(password);
      cy.get('button[type="submit"]').contains('Login').click();
  
      // Check that the user is redirected to the feed page
      cy.url().should('include', '/Feed');
    });
  });
  