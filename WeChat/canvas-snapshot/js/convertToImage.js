
var convertToImage = (function () {

    function createBaseCanvas(scale, width, height) {
        const canvas = document.createElement('canvas');

        canvas.width = width * scale;
        canvas.height = height * scale;

        const context = canvas.getContext("2d");

        // 关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        context.scale(scale, scale);


        return canvas;
    }

    function convertToImage(container, options = {}) {
        const scale = window.devicePixelRatio;

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        const canvas = createBaseCanvas(scale, width, height);

        const ops = {
            // scale,
            // width,
            // height,
            // canvas,
            useCORS: true, // 如果截图的内容里有图片,解决文件跨域问题
            allowTaint: false, // 是否允许跨源图像污染画布
            // backgroundColor: null, // 解决生成的图片有白边
            ...options
        };

        return html2canvas(container, ops).then(canvas => {
            const imageEl = Canvas2Image.convertToPNG(canvas, canvas.width, canvas.height)
            return imageEl
        })
    }

    return convertToImage
})()

