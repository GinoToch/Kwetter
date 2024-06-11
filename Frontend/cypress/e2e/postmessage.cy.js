describe('postmessage', () => {
    before(() => {
      // Simulate user login
      cy.visit('https://ambitious-grass-072c1e803.5.azurestaticapps.net');
      cy.get('input[placeholder="Your username"]').type('janou');
      cy.get('input[placeholder="Your password"]').type('meh7');
      cy.get('button[type="submit"]').contains('Login').click();
    });
  
    it('should post a new tweet', () => {
      // Fill in tweet form
      cy.get('input[placeholder="Enter message for tweet"]').type('This is a test tweet');
      cy.get('button').contains('Post tweet').click();
  
      // Check for the notification
      cy.get('.mantine-Notification-root').should('contain', 'Tweet posted successfully');
    });
  
    // it('should display tweets', () => {
    //   // Check that tweets are displayed
    //   cy.get('.mantine-Card-root').should('contain', 'This is a test tweet');
    // });
  });
  