module.exports = {
  apps: [
    {
      name: "CoodoPay",
      script: "./bin/www",
      instances: "max",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
