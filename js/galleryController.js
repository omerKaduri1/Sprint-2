'use strict'

function renderGallery() {
    // REFACTOR TO MAP
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <img src="${img.url}">
    `)
   
    const elGallery = document.querySelector('section.gallery')
    elGallery.innerHTML = strHTMLs
}