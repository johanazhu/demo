const express = require('express');
const app = express();
var options = {
    etag: false, // 禁用协商缓存
    lastModified: false, // 禁用协商缓存
    setHeaders: (res, path, stat) => {
        // res.set('expires', new Date(Date.now() + 1000).toString())
        // res.set('Cache-Control', 'max-age=10'); // 强缓存超时时间为10秒
        res.setHeader('Cache-Control', 'public, max-age=10')
        // console.log('res', res)
        // res.set('Expires', new Date(Date.now() + 1000).toString())
    },
};
app.use(express.static((__dirname + '/public'), options));
app.listen(3008);
