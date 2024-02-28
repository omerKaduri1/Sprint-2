'use strict'

var gElCanvas
var gCtx
var gElEditor = document.querySelector('.editor')

const LINE_SPACE = 50

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
        let x = gElCanvas.width / 2
        let y = LINE_SPACE
        meme.lines.forEach((line, idx) => {
            const meme = getMeme()
            drawText(line.txt, line.size, line.color, y, x)
            let txtWidth = gCtx.measureText(line.txt).width
            line.txtWidth = txtWidth
            line.y = y
            line.x = x
            if (meme.selectedLineIdx === idx) drawFrame(x, y, line.size, txtWidth)
            y += LINE_SPACE
        })
    }
}

function drawText(text = 'Hello Meme Generator!', size, color, y, x) {
    // let y = gElCanvas.height / 6
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    // gCtx.fillStyle = 'whitesmoke'

    gCtx.font = `${size}px Impact`
    gCtx.textAlign = 'center'

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
    const newLine = addLine()
    const { x, y, size, txtWidth } = newLine
    drawFrame(x, y, size, txtWidth)
    renderMeme()
}

function onSwitchLines() {
    const txtInput = document.querySelector('.txt-edit')
    txtInput.value = ''
    const line = switchLines()
    renderMeme()
}

function drawFrame(x, y, size, txtWidth) {
    gCtx.beginPath()
    gCtx.setLineDash([3, 3])
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - (txtWidth / 2), y - size, txtWidth + 5, size + 5)
    gCtx.setLineDash([])

}

function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}