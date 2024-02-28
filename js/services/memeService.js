'use strict'

var gImgs
var gId = 1
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'green'
        }
    ]
}

_createImgs()

function getMeme() {
    return gMeme
}

function setLineTxt(newTxt) {
    gMeme.lines[0].txt = newTxt
}

function setTxtColor(newColor) {
    gMeme.lines[0].color = newColor
}

function setTxtSize(operator) {
    if (operator === '+') gMeme.lines[0].size++
    if (operator === '-') gMeme.lines[0].size--
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgs() {
    return gImgs
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