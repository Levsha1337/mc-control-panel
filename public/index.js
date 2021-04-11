async function main() {
    const app = new Vue({
        el: '#app',
        data: {
            servers: await api.getServers(),
            newServerName: '',
            newServerAuth: true,
            // newServerWhitelist: true
        },
        methods: {
            createServer: async function() {
                this.servers = await api.createServer(this.newServerName, this.newServerAuth);
    
                this.newServerName = '';
                this.newServerAuth = true;
            }
        }
    });
}

main();
