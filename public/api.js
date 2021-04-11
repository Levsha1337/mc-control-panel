const api = {
    getServers: async function() {
        return await fetch('api/getServers').then(resp => resp.json());
    },

    createServer: async function(serverName, auth) {
        return await fetch(`api/createServer?name=${serverName}${auth?'&auth':''}`)
    }
};
