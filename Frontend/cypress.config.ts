import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "hr2vh8",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://agreeable-bush-0efb41003.5.azurestaticapps.net', // your frontend URL
    chromeWebSecurity: false, // Disable web security to allow HTTP calls
  },
});
