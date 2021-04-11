const fs = require('fs-extra');
const cp = require('child_process');
const express = require('express');
const config = require('./config.json');

const app = express();

function isEmpty(...strs) {
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        if (str === undefined || str.trim() == '')
            return true;
    }

    return false;
}

function getServers() {
    return fs.readdirSync('servers', { withFileTypes: true })
        .filter(d => d.isDirectory() && d.name !== 'template')
        .map(d => d.name);
}

function createServer(name, auth) {
    fs.copySync('servers/template', `servers/${name}`);

    if (auth === undefined) {
        fs.removeSync(`servers/${name}/plugins`);
    }
}

const serve = express.static('public', {
    index: 'index.html'
});

app.use(serve);

app.get('/api/getServers', (req, res) => {
    res.send(JSON.stringify(getServers()));
});

app.get('/api/createServer', (req, res) => {
    let serverName = req.query.name;

    if (isEmpty(serverName)) {
        return res.status(400).end();
    }

    servername = serverName.replace(/\//g, '')
        .replace(/\\/g, '').replace(/\.{1,}/g, '.');

    createServer(serverName, req.query.auth);

    res.send(getServers());
});

app.get('/api/startServer', (req, res) => {

});

app.get('/api/stopServer', (req, res) => {

});

app.get('/api/command', (req, res) => {

})

app.listen(config.port, config.hostname || '127.0.0.1', () => {
    console.log(`Server is listening at ${config.hostname || '127.0.0.1'}:${config.port}`);
});
