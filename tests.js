// model track-single track-
// https://chillhop.com/releases/teddy-roxpin-beattape-vol-3/

const puppeteer = require('puppeteer')
const fs = require('fs')

const getFirst = async (page) => {
  //  const first = await page.evaluate(() => {
    // const artist = document.querySelector('[class^="no-ajaxy playSong play-button track"]')
    // model track-single track-
    // col-md-12 inline-tracks margin-bottom
  //  return artist
  //})
  await page.click('[class^="no-ajaxy playSong play-button track"]')
  // console.log(first)
  // return first
}

const getTitle = async (page) => {
  const title = await page.evaluate(() => {
    const title = document.querySelector('.jp-title').innerText
    return title
  })
  console.log(title)
  return title
}

const getArtist = async (page) => {
  const artist = await page.evaluate(() => {
    const artist = document.querySelector('.jp-artists').innerText
    return artist
  })
  console.log(artist)
  return artist
}

const getUrl = async (page) => {
  const url = await page.evaluate(() => {
    const url = document.querySelector('audio').src
    return url
  })
  console.log(url)
  return url
}

const main = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('browser launched.')

  await page.goto('https://chillhop.com/releases/allem-iverson-x-little-blue-beattape-vol-4/'/*, {waitUntil: 'networkidle0'}*/)

  console.log('page loaded...')

  await getFirst(page)

  const title = await getTitle(page)
  const author = await getArtist(page)
  const path = await getUrl(page)

  console.log('title: ' + title)
  console.log('author: ' + author)
  console.log('path: ' + path)

  console.log('hola')
  
  await browser.close();
}

main()
