'use strict'

var gElCanvas
var gCtx
var gElEditor = document.querySelector('.editor')
let gStartPos

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']
const LINE_SPACE = 50

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    gElEditor.style.display = 'none'

    resizeCanvas()
    renderGallery()
    addListeners()
}

function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = `img/${meme.selectedImgId}.jpg`
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    let x = gElCanvas.width / 2
    let y = 50
    meme.lines.forEach((line, idx) => {
        const meme = getMeme()
        drawText(line.txt, line.size, line.color, y, x, line.txtAlign, meme.font)
        let txtWidth = gCtx.measureText(line.txt).width
        line.txtWidth = txtWidth
        line.y = y
        line.x = x
        if (meme.selectedLineIdx === idx) drawFrame(x, y, line.size, txtWidth)
        y += 50
    })
}

function drawText(text, size, color = 'black', y, x, textAlign, font) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

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

function onDeleteTxt() {
    deleteTxt()
    renderMeme()
}

// function onTxtMove(operator) {
//     moveTxt(operator)
//     renderMeme()
// }

function onAlignTxt(alignment) {
    alignTxt(alignment)
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
    // const { offsetX, offsetY } = pos

    const clickedLineIdx = findClickedLine(gStartPos.x, gStartPos.y)
    if (clickedLineIdx === -1) return
    console.log('?');
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

async function shareCanvas() {
    // const canvasElement = document.getElementById('mycanvasid');
    const dataUrl = gElCanvas.toDataURL()
    const blob = await (await fetch(dataUrl)).blob()
    const filesArray = [
        new File(
            [blob],
            'my-meme.png',
            {
                type: blob.type,
                lastModified: new Date().getTime()
            }
        )
    ]
    const shareData = {
        files: filesArray,
    }
    navigator.share(shareData)
}
