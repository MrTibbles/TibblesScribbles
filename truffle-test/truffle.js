module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "bootstrap.css": [
      "stylesheets/bootstrap.min.css"
    ],    
    "images/": "images/"
  },
  deploy: [
    "JaakTopLevel",
    "AccessPass"
  ],
  rpc: {
    host: "localhost",
    port: 8545
  }
};
