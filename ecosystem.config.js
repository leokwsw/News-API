module.exports = {
  apps: [{
    name: "News API",
    namespace: "News API",
    script: "ts-node",
    args: "-T ./src/backend.ts",
    wait_ready: true,
    listen_timeout: 5000,
    env_production: {
      "PORT": "9000"
    }
  }],
  deploy: {
    production: {
      host: "localhost",
      ref: "origin/main",
      repo: "git@github.com:leokwsw/News-API.git",
      path: "~/news",
      "pre-deploy": "git fetch && git reset --hard origin/main",
      "post-deploy": "sudo npm install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
}
