'use strict'

function renderGallery() {
    const imgs = getImgs()
    const strHTMLs = imgs.map(img => `
    <img onclick="onImgSelect(${img.id})" src="${img.url}">
    `)

    const elGallery = document.querySelector('.gallery-img-container')
    elGallery.innerHTML = strHTMLs.join('')
}

function renderDataList() {
    const keywords = getKeywords()
    const keyNames = Object.keys(keywords)
    const strHTMLs = keyNames.map(keyName => `<option value="${keyName}"></option>`)

    const elDatalist = document.querySelector('datalist')
    elDatalist.innerHTML = strHTMLs.join('')
}

function renderKeywordsList() {
    const keywords = getKeywords()
    let strHTML = ''
    for (const keyword in keywords) {
        const wordSize = !keywords[keyword] ? 15 : keywords[keyword] + 15
        strHTML += `<li onclick="onKeywordSearch(this.id)" id="${keyword}" style="font-size: ${wordSize}px">${keyword}</li>`
    }

    const elKeywordsList = document.querySelector('.keywords-list')
    elKeywordsList.innerHTML = strHTML
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

function onSetFilter(filter) {
    setFilterBy(filter)
    renderKeywordsList()
    renderGallery()
}

function onKeywordSearch(keyword){
    const elSearchInput = document.querySelector('input.filter')
    elSearchInput.value = keyword
    setFilterBy(keyword)
    renderKeywordsList()
    renderGallery()
}

function onRandomClick() {
    const elGallery = document.querySelector('section.gallery')
    const elMain = document.querySelector('main')
    elMain.classList.add('editor')
    elGallery.style.display = 'none'
    gElEditor.style.display = 'flex'
    createRandMeme()
    renderMeme()
}

function onClearFilter() {
    const elFilter = document.querySelector('input.filter')
    elFilter.value = ''
    setFilterBy(elFilter.value)
    renderGallery()
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