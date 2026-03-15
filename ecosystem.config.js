module.exports = {
  apps: [
    {
      name: "gs1_media_cdn",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 7812,
      },
    },
  ],
};
