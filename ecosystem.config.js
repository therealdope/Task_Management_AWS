module.exports = {
    apps: [{
        name: 'task-manager',
        script: 'npm',
        args: 'run prod',
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G'
    }]
}