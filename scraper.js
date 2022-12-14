const puppeteer = require('puppeteer')
const fs = require('fs')

let songs = []

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

const clickNext = async (page) => {
  const nextBtn = await page.$('.dkplayer-next')
  await nextBtn.evaluate(nextBtn => nextBtn.click())
  console.log('click next done')
}

// get id in base or url
const getId = (url) => {
  const halfId = url.split('/').pop()
  id = halfId.slice(5)
  console.log(id)
  return id
}

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://chillhop.com/releases/', {waitUntil: 'networkidle0'})

  console.log('page opened')

  for (let i = 0; i < 15; i++) {
    const title = await getTitle(page)
    const author = await getArtist(page)
    const path = await getUrl(page)
    const id = getId(path)
    songs.push({title, author, path, id})
    await clickNext(page)
  }

  await browser.close();

  // save as json file
  fs.writeFile('songs3.json', JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })

}

scraper()
