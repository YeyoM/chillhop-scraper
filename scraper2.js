const puppeteer = require('puppeteer')
const fs = require('fs')

let songs = []

let urls = [
  'https://chillhop.com/releases/teddy-roxpin-beattape-vol-3/',
  'https://chillhop.com/releases/allem-iverson-x-little-blue-beattape-vol-4/',
  'https://chillhop.com/releases/lookaway/',
  'https://chillhop.com/releases/no-problem/',
  'https://chillhop.com/releases/j-folk-beattape-vol-2/',
  'https://chillhop.com/releases/the-breed-making-a-way/',
  'https://chillhop.com/releases/a-note-from-my-book/',
  'https://chillhop.com/releases/swum-idealism-beattape-vol1/',
  'https://chillhop.com/releases/hold-me-tight/',
  'https://chillhop.com/releases/j-folk-berry-drive/',
  'https://chillhop.com/releases/everyday/',
  'https://chillhop.com/releases/monolith/',
  'https://chillhop.com/releases/the-field-from-spirited-away/',
  'https://chillhop.com/releases/shrimpnose-changes-in-time/',
  'https://chillhop.com/releases/poldoore-after-hours/',
  'https://chillhop.com/releases/knowmadic-changing-winds/',
  'https://chillhop.com/releases/humility-piece/',
  'https://chillhop.com/releases/highs-and-lows/',
  'https://chillhop.com/releases/shrimpnose-chief-sundials/',
  'https://chillhop.com/releases/chromonicci-yasper-low-tide/',
  'https://chillhop.com/releases/full-circle/',
  'https://chillhop.com/releases/a-reminder/',
  'https://chillhop.com/releases/late-night-essentials/',
  'https://chillhop.com/releases/nectarine/',
  'https://chillhop.com/releases/chillhop-essentials-summer-2022/',
  'https://chillhop.com/releases/teddy-roxpin-summer-in-cotuit/',
  'https://chillhop.com/releases/indian-summer-rally/',
  'https://chillhop.com/releases/parasol/',
  'https://chillhop.com/releases/caramel/',
  'https://chillhop.com/releases/montauk-paddling/',
  'https://chillhop.com/releases/reflections/',
  'https://chillhop.com/releases/kissamile-timelapse/',
  'https://chillhop.com/releases/blue-moment/'
]

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

const getFirstSong = async (page) => {
  const firstSongBtn = await page.$('.dkplayer-play')
  await firstSongBtn.evaluate(nextBtn => nextBtn.click())
  console.log('click first done')
}

const scraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('browser launched...')

  for (let i = 0; i < urls.length; i++) {
    await page.goto(urls[i], {waitUntil: 'networkidle0'})
    console.log('new page loaded... ' + urls[i])
    await getFirstSong(page)
    for (let j = 0; j < 12; j++) {
      const title = await getTitle(page)
      const author = await getArtist(page)
      const path = await getUrl(page)
      const id = getId(path)
      songs.push({title, author, path, id})
      await clickNext(page)
    }
    // delete duplicates with set
    songs = [...new Set(songs)]
  }

  await browser.close();

  // save as json file
  fs.writeFile('songs5.json', JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })

}

scraper()
