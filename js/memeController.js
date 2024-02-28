'use strict'

var gElCanvas
var gCtx
var gElEditor = document.querySelector('.editor')


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    gElEditor.style.display = 'none'
    // renderMeme()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        let y = gElCanvas.height / 6
        meme.lines.forEach(line => {
            drawText(line.txt, line.size, line.color, y)
            y = gElCanvas.height / 1.5
        })
    }
}

function drawText(text = 'Hello Meme Generator!', size, color, y) {
    let x = gElCanvas.width / 2
    // let y = gElCanvas.height / 6
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    // gCtx.fillStyle = 'whitesmoke'

    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onTxtChange(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

function onColorChange(newColor) {
    setTxtColor(newColor)
    renderMeme()
}

function onTxtSizeChange(operator) {
    setTxtSize(operator)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}