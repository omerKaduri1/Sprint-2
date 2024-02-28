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

function setImg(imgId) {
    gMeme.selectedImgId = imgId
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

function _createImg(id = gId++) {
    return {
        id,
        url: `img/${id}.jpg`,
        keywords: ['funny', 'president']
    }
}