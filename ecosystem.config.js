module.exports = {
  apps: [
    {
      name: 'obuce-backend-dev',
      watch: '.',
      ignore_watch: ['node_modules', 'uploads', 'scheduler.js', 'schedule'],
      script: 'app.js',
      autorestart: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
