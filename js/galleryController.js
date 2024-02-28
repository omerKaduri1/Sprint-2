'use strict'

function renderGallery() {
    // REFACTOR TO MAP
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <img onclick="onImgSelect(${img.id})" src="${img.url}">
    `)
   
    const elGallery = document.querySelector('section.gallery')
    elGallery.innerHTML = strHTMLs
}

function onImgSelect(imgId){
    setImg(imgId)
    renderMeme()
}