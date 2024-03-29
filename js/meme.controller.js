'use strict'

var gElCanvas
var gCtx
var gElEditor = document.querySelector('.editor')
var gElSavedMemes = document.querySelector('.saved-memes')
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
const LINE_SPACE = 50

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gElEditor.style.display = 'none'
    gElSavedMemes.style.display = 'none'

    resizeCanvas()
    renderGallery()
    renderDataList()
    renderKeywordsList()
    addListeners()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    if (meme) {
        img.src = `img/${meme.selectedImgId}.jpg`
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        meme.lines.forEach((line, idx) => {
            const meme = getMeme()
            const { txt, size, color, fillColor, pos, txtAlign } = line
            drawText(txt, size, color, fillColor, pos.y, pos.x, txtAlign, meme.font)
            let txtWidth = gCtx.measureText(line.txt).width
            line.txtWidth = txtWidth
            if (meme.selectedLineIdx === idx) drawFrame(pos.x, pos.y, size, txtWidth)
        })
    }
}

function drawText(text, size, color, fillColor, y, x, textAlign, font) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color
    gCtx.fillStyle = fillColor

    gCtx.font = `${size}px ${font}`
    gCtx.textAlign = textAlign

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onTxtChange(newTxt) {
    setLineTxt(newTxt)
    renderMeme()
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function ondeleteLine() {
    deleteLine()
    renderMeme()
}

function onAlignTxt(alignment) {
    alignTxt(alignment)
    renderMeme()
}

function onColorChange(newColor) {
    setTxtColor(newColor)
    renderMeme()
}

function onFillColorChange(newColor) {
    setFillTxtColor(newColor)
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
    switchLines()
    renderMeme()
}

function drawFrame(x, y, size, txtWidth) {
    gCtx.beginPath()
    gCtx.setLineDash([5, 3])
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    if (gCtx.textAlign === 'center') x = x - (txtWidth / 2)
    if (gCtx.textAlign === 'right') x = x - txtWidth
    gCtx.strokeRect(x, y - size, txtWidth + 5, size + 5)
    gCtx.setLineDash([])
}

function removeFrame(x, y, size, txtWidth) {
    if (gCtx.textAlign === 'center') x = x - (txtWidth / 2)
    if (gCtx.textAlign === 'right') x = x - txtWidth
    gCtx.clearRect(x, y - size, txtWidth + 5, size + 5)
}

function onCanvasClick(ev) {
    gStartPos = getEvPos(ev)

    const clickedLineIdx = findClickedLine(gStartPos.x, gStartPos.y)
    if (clickedLineIdx === -1) return
    setLineDrag(true)
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onLineMove(ev) {
    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function downloadMeme(elLink) {
    elLink.download = 'my-meme'
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onCanvasClick)
    gElCanvas.addEventListener('mousemove', onLineMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onCanvasClick)
    gElCanvas.addEventListener('touchmove', onLineMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth || 450
    gElCanvas.height = elContainer.offsetHeight || 450
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]

        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onSaveMeme() {
    saveMeme()
}

function onMemesClick() {
    const elGallery = document.querySelector('section.gallery')
    gElSavedMemes.style.display = 'block'
    elGallery.style.display = 'none'
    gElEditor.style.display = 'none'
    renderSavedSection()
}