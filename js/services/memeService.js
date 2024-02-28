'use strict'

var gImgs = [{id: 1, url: 'img/1.jpg', keywords: ['funny', 'president']}]
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

function getMeme() {
    return gMeme
}

function setLineTxt(newTxt) {
    gMeme.lines[0].txt = newTxt
}