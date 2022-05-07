const express = require('express');
const app = express();
var options = {
    etag: false, // 禁用协商缓存
    lastModified: false, // 禁用协商缓存
    setHeaders: (res, path, stat) => {
        res.set('Cache-Control', 'max-age=10'); // 强缓存超时时间为10秒
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
        <li>再将2.jpg改成3.jpg</li>
        <li>点击浏览器的后退键，观察Network是否有请求</li>
        <li>强缓存是不会去请求的</li>
    `)
})
app.listen(3000, () => {
    console.log('3000项目启动')
});
