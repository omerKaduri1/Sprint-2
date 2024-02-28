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
    img.onload = () =>  {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(meme.lines[0].txt, meme.lines[0].size, meme.lines[0].color)
    }

}

function drawText(text = 'Hello Meme Generator!', size, color) {
    const x = gElCanvas.width / 2
    const y = gElCanvas.height / 2
	gCtx.lineWidth = 2
	gCtx.strokeStyle = color

	// gCtx.fillStyle = 'whitesmoke'

	gCtx.font = `${size}px Impact`
	gCtx.textAlign = 'center'
	// gCtx.textBaseline = 'middle'

	gCtx.fillText(text, x, y)
	gCtx.strokeText(text, x, y)
}

function onTxtChange(newTxt){
    setLineTxt(newTxt)
    renderMeme()
}