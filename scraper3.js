const puppeteer = require('puppeteer')
const fs = require('fs')

let songs = []

let prevTitle = ''
let title = ''
let author = ''
let path = ''
let id = ''

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

  const browser = await puppeteer.launch()
  console.log('browser launched. . .')

  const page = await browser.newPage()
  console.log('new page opened. . .')

  for (let i = 0; i < urls.length; i++) {

    await page.goto(urls[i], {waitUntil: 'networkidle0'})
    console.log('new page loaded. . . ' + urls[i])
    
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
      songs.push({id, title, author, path})
      await clickNext(page)
      title = await getTitle(page)
      console.log('Next song title: ', title)
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
