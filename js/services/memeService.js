'use strict'

var gImgs 
var gId = 0
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

function getImgs() {
    return gImgs
}

function _createImgs() {
    gImgs = [
        _createImg(),
        _createImg()
    ]
    return gImgs
}

function _createImg() {
    return {
        id: gId++,
        url: `img/${gId}.jpg`,
        keywords: ['funny', 'president']
    }
}