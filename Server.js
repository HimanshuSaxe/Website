const ftp = require('ftp');
const express = require('express');
const app = express();
const port = 3000;

app.get('/ftp-data', (req, res) => {
    const client = new ftp();
    const ftpData = [];

    client.on('ready', () => {
        client.list((err, list) => {
            if (err) throw err;
            list.forEach(file => {
                ftpData.push({ name: file.name, size: file.size });
            });
            client.end();
            res.json(ftpData);
        });
    });

    client.connect({
        host: '13.126.194.224',
        user: 'ftp_user',
        password: 'admin'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
