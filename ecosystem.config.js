module.exports = {
  apps: [
    {
      name: "gs1_media_cdn",
      script: "dist/index.js", // point directly to compiled entry
      env: {
        NODE_ENV: "production",
        PORT: 7812,
      },
    },
  ],
};
