module.exports = {
  apps: [
    {
      name: "my-app",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 7812,
      },
    },
  ],
};
