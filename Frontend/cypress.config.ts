import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://agreeable-bush-0efb41003.5.azurestaticapps.net', // your frontend URL
    chromeWebSecurity: false, // Disable web security to allow HTTP calls
  },
});
