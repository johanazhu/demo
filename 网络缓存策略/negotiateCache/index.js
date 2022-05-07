const express = require('express');
const app = express();
var options = {
    etag: true, // 开启协商缓存
    lastModified: true, // 开启协商缓存
    setHeaders: (res, path, stat) => {
        res.set({
            'Cache-Control': 'max-age=00', // 浏览器不走强缓存
            'Pragma': 'no-cache', // 浏览器不走强缓存
        });
    },
};
app.use(express.static((__dirname + '/public'), options));
app.get('/', function (req, res) {
    res.send(`
        <h1>Hello Negotiate Cache</h1>
            <p>使用说明</p>
            <li>打开F12，观察Network</li>
            <li>在url后面输入/1.jpg</li>
            <li>将1.jpg改为2.jpg</li>
            <li>再将2.jpg改为3.jpg</li>
            <li>将3.jpg改为2.jpg，观察Network，其中Status成304，说明协商缓存生效</li>
            <li>同理，改成任何一张图片，观察Network，其Status成304，说明协商缓存生效</li>
    `)
})
app.listen(3001, () => {
    console.log('3001项目启动')
});
