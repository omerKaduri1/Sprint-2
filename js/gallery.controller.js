'use strict'

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <img onclick="onImgSelect(${img.id})" src="${img.url}">
    `)

    const elGallery = document.querySelector('section.gallery')
    elGallery.innerHTML = strHTMLs.join('')
}

function onGalleryClick() {
    setImgFromGallery(true)
    const elGallery = document.querySelector('section.gallery')
    elGallery.style.display = 'block'
    gElEditor.style.display = 'none'

}

function onImgSelect(imgId) {
    const elGallery = document.querySelector('section.gallery')
    const elMain = document.querySelector('main')
    elMain.classList.add('editor')
    elGallery.style.display = 'none'
    gElEditor.style.display = 'flex'
    createMeme()
    setImg(imgId)
    renderMeme()
}

function openMenu() {
    document.body.classList.add('menu-open')
    const menuBtn = document.querySelector('.open-menu-btn')
    const closeBtn = document.querySelector('.close-menu-btn')
    menuBtn.style.display = 'none'
    closeBtn.style.display = 'inline-block'
}

function closeMenu() {
    document.body.classList.remove('menu-open')
    const closeBtn = document.querySelector('.close-menu-btn')
    const menuBtn = document.querySelector('.open-menu-btn')
    menuBtn.style.display = 'inline-block'
    closeBtn.style.display = 'none'
}