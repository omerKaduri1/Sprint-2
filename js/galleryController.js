'use strict'

function renderGallery() {
    // REFACTOR TO MAP
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <img onclick="onImgSelect(${img.id})" src="${img.url}">
    `)
   
    const elGallery = document.querySelector('section.gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId){
    const elGallery = document.querySelector('section.gallery')
    elGallery.style.display = 'none'
    gElEditor.style.display = 'grid'
    setImg(imgId)
    renderMeme()
}