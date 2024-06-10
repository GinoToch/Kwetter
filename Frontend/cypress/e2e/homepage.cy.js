describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('https://ambitious-grass-072c1e803.5.azurestaticapps.net');
  });

  it('should display login form', () => {
    // Check that the login form is displayed
    cy.get('form').should('contain', 'Username');
    cy.get('form').should('contain', 'Password');
    cy.get('form').should('contain', 'Login');
  });

  it('should toggle to register form', () => {
    // Toggle to the register form
    cy.contains('Want to register?').click();
    cy.get('form').should('contain', 'Register');
  });

  it('should fail login with invalid credentials', () => {
    // Fill in login form with invalid credentials
    cy.get('input[placeholder="Your username"]').type('invalidUser');
    cy.get('input[placeholder="Your password"]').type('invalidPass');
    cy.get('button[type="submit"]').contains('Login').click();

    // Check for the notification
    cy.get('.mantine-Notification-root').should('contain', 'Invalid username or password');
  });

  it('should register a new user', () => {
    // Toggle to the register form
    cy.contains('Want to register?').click();

    // Fill in register form with valid credentials
    cy.get('input[placeholder="Your username"]').type('newUser');
    cy.get('input[placeholder="Your password"]').type('newPass');
    cy.get('button[type="submit"]').contains('Register').click();

    // Check for the notification
    cy.get('.mantine-Notification-root').should('contain', 'You have successfully registered');
  });
});
