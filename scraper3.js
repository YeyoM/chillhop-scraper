import { launch } from 'puppeteer'
import { writeFile } from 'fs'
import urls, { length } from './urls'

let songs = []

let prevTitle = ''
let title = ''
let author = ''
let path = ''
let id = ''
let albumUrl

const getTitle = async (page) => {
  const title = await page.evaluate(() => {
    const title = document.querySelector('.jp-title').innerText
    return title
  })
  return title
}

const getArtist = async (page) => {
  const artist = await page.evaluate(() => {
    const artist = document.querySelector('.jp-artists').innerText
    return artist
  })
  return artist
}

const getUrl = async (page) => {
  const url = await page.evaluate(() => {
    const url = document.querySelector('audio').src
    return url
  })
  return url
}

const clickNext = async (page) => {
  const nextBtn = await page.$('.dkplayer-next')
  await nextBtn.evaluate(nextBtn => nextBtn.click())
  console.log('click next done')
}

// get id in base or url
const getId = (url) => {
  const halfId = url.split('/').pop()
  id = halfId.slice(5)
  return id
}

const getFirst = async (page) => {
  await page.click('[class^="no-ajaxy playSong play-button track"]')
  await page.waitForTimeout(2000)
}

// function to know if a song is already in the array
const isAlreadyIn = (title) => {
  let isAlready = false
  songs.forEach(song => {
    if (song.title === title) {
      isAlready = true
    }
  })
  return isAlready
}

const scraper = async () => {

  const browser = await launch()
  console.log('browser launched. . .')

  const page = await browser.newPage()
  console.log('new page opened. . .')

  for (let i = 0; i < length; i++) {

    await page.goto(urls[i], {waitUntil: 'networkidle0'})
    console.log('new page loaded. . . ' + urls[i])

    albumUrl = urls[i]
    
    await getFirst(page)
    console.log('go to first done. . .')

    title = await getTitle(page)

    // El bucle va a ir hasta que el nuevo titulo sea igual al anterior
    while (title !== prevTitle && !isAlreadyIn(title)) {
      console.log('title: ', title)
      prevTitle = title
      author = await getArtist(page)
      console.log('author: ', author)
      path = await getUrl(page)
      console.log('path: ', path)
      id = getId(path)
      console.log('id: ', id)
      songs.push({id, title, author, path, albumUrl})
      await clickNext(page)
      title = await getTitle(page)
      console.log('Next song title: ', title)
    }
    // delete duplicates with set
    songs = [...new Set(songs)]
  }

  await browser.close();

  // save as json file
  writeFile('songs9.json', JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!')
  })

}

scraper()
