const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: "https://www.99.co/singapore",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "electron") {
          // Modify Electron launch options
          launchOptions.preferences["disable-popup-blocking"] = true; // Disable pop-ups
          launchOptions.preferences["imagesEnabled"] = false; // Optional: Disable images to reduce ads
        }
        return launchOptions;
      });

      return require("./cypress/plugins/index.js")(on, config);
    },
  },
});
