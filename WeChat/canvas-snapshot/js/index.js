

(function () {
    var qrcode = document.getElementById("qrcode")
    new QRCode(qrcode, {
        width: 56,
        height: 56,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    }).makeCode(window.location.href)

    let keywords = ['老后破产', '牛马一生', '缺衣少食', '勉强度日', '基本满足', '精致生活', '养老自由']
    // 退休关键字
    const wordsId = document.getElementsByClassName("center-words")
    const priceId = document.getElementsByClassName("center-price")
    let keyword = ""
    const price = Math.floor(Math.random() * 10000)
    if (price <= 500) {
        keyword = keywords[0]
    } else if (500 < price && price <= 1000) {
        keyword = keywords[1]
    } else if (1000 < price && price <= 2000) {
        keyword = keywords[2]
    } else if (2000 < price && price <= 4000) {
        keyword = keywords[3]
    } else if (4000 < price && price <= 6000) {
        keyword = keywords[4]
    } else if (6000 < price && price <= 8000) {
        keyword = keywords[5]
    } else if (8000 < price && price <= 10000) {
        keyword = keywords[6]
    }

    wordsId[0].innerHTML = keyword
    priceId[0].innerHTML = price

    setTimeout(() => {
        convertToImage(document.querySelector("#capture")).then((imageEl) => {
            document.getElementsByClassName("save")[0].appendChild(imageEl)
        })
    }, 1000)

})()