'use strict'

const MEME_DB = 'memeDB'
var gElCanvas = document.querySelector('canvas')
var gImgs
var gCenter = gElCanvas.width / 2
var gY = 20
var gId = 1
var gMeme
var gFilterBy = ''

_createImgs()

var gKeywordSearchCountMap = { 'funny': 3, 'cat': 0, 'baby': 2 }

function createMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        font: 'Impact',
        lines: [
            _createLine(),
        ]
    }
}

function getMeme() {
    return gMeme
}

function getImgs() {
    if (!gFilterBy) return gImgs
    return _filterImgs()
}

function getKeywords() {
    return gKeywordSearchCountMap
}

// function getCurrLine() {
//     return gMeme.lines[gMeme.selectedLineIdx]
// }

function setLineTxt(newTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = newTxt
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}

function setTxtColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}

function setFillTxtColor(newColor) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = newColor
}

function setTxtSize(operator) {
    if (operator === '+') gMeme.lines[gMeme.selectedLineIdx].size++
    if (operator === '-') gMeme.lines[gMeme.selectedLineIdx].size--
}

function setFont(font) {
    gMeme.font = font
}

function alignTxt(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].txtAlign = alignment
}

function addLine() {
    const newLine = _createLine()
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    return newLine
}

function switchLines() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    return gMeme.lines[gMeme.selectedLineIdx]
}

function findClickedLine(offsetX, offsetY) {
    const idx = gMeme.lines.findIndex(line => {
        let { pos, size, txtWidth } = line
        if (gCtx.textAlign === 'center') {
            pos.x = pos.x - (txtWidth / 2)
        }
        return offsetX >= pos.x && offsetX <= (pos.x + txtWidth)
            && offsetY <= pos.y && offsetY >= (pos.y - size)
    })
    if (idx !== -1) gMeme.selectedLineIdx = idx
    return idx
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function setImgFromGallery(isImgFromGallery) {
    gMeme.isImgFromGallery = isImgFromGallery
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy.toLowerCase()
}

function _filterImgs() {
    const filteredImgs = gImgs.filter(img => {
        const { keywords } = img
        return keywords.some(word => word.toLowerCase().includes(gFilterBy))
    })
    return filteredImgs
}

function _createLine(y = gY + 30) {
    const newLine = {
        pos: {
            x: gCenter,
            y,
        },
        txt: 'Enter Text',
        size: 20,
        color: 'black',
        fillColor: 'white',
        txtAlign: 'center',
        isDrag: false
    }
    gY = y
    return newLine
}

function _createImgs() {
    gImgs = [
        _createImg(['funny', 'president', 'donald trump']),
        _createImg(['cute', 'dog', 'animal']),
        _createImg(['cute', 'baby', 'animal', 'dog']),
        _createImg(['cute', 'cat', 'animal']),
        _createImg(['happy', 'success', 'baby']),
        _createImg(['funny']),
        _createImg(['funny', 'baby', 'surprise']),
        _createImg(['funny']),
        _createImg(['funny', 'baby', 'laugh']),
        _createImg(['happy', 'laugh', 'president', 'barack obama']),
        _createImg(['wrestle', 'man']),
        _createImg(['funny', 'haim hecht', 'point']),
        _createImg(['cheers', 'leonardo dicaprio', 'happy']),
        _createImg(['serious']),
        _createImg(['serious', 'game of thrones', 'eddard stark']),
        _createImg(['funny']),
        _createImg(['serious', 'vladimir putin', 'president']),
        _createImg(['movie', 'toy story']),
    ]
    return gImgs
}

function _createImg(keywords = ['funny'], id = gId++,) {
    return {
        id,
        url: `img/${id}.jpg`,
        keywords
    }
}