const puppeteer = require('puppeteer')
const fs = require('fs')

let songs = []

let prevTitle = ''
let title = ''
let author = ''
let path = ''
let id = ''
let albumUrl

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
  'https://chillhop.com/releases/blue-moment/',
  'https://chillhop.com/releases/glow/',
  'https://chillhop.com/releases/parasols1/',
  'https://chillhop.com/releases/riverside/',
  'https://chillhop.com/releases/sleepy-fish-x-philanthrope-awtf2/',
  'https://chillhop.com/releases/chillhop-essentials-spring-2022/',
  'https://chillhop.com/releases/everyday/',
  'https://chillhop.com/releases/cygn-night-fishing/',
  'https://chillhop.com/releases/somber-sky/',
  'https://chillhop.com/releases/green-tea/',
  'https://chillhop.com/releases/santiago/',
  'https://chillhop.com/releases/fieldstudies1/',
  'https://chillhop.com/releases/letters/',
  'https://chillhop.com/releases/cygn-tropical-midnight/',
  'https://chillhop.com/releases/repent/',
  'https://chillhop.com/releases/ending/',
  'https://chillhop.com/releases/reunion/',
  'https://chillhop.com/releases/leaf-contour/',
  'https://chillhop.com/releases/in-my-head/',
  'https://chillhop.com/releases/rewind/',
  'https://chillhop.com/releases/parkbench-epiphany-antimidas/',
  'https://chillhop.com/releases/maydee-la-zona/',
  'https://chillhop.webflow.io/releases/chillhop-essentials-winter-2021/v4',
  'https://chillhop.com/releases/ezzy-hung-up/',
  'https://chillhop.com/releases/teddy-roxpin-beattape-vol-3/',
  'https://chillhop.webflow.io/releases/philanthrope-mommy-invisible/nv-s-bl',
  'https://chillhop.com/releases/aviino-cocoon/',
  'https://chillhop.com/releases/hanz-on-the-other-side/',
  'https://chillhop.com/releases/smile-high-teddy-roxpin-endless-beginnings/',
  'https://chillhop.com/releases/inside-a-saltwater-room/',
  'https://chillhop.webflow.io/releases/chillhop-essentials-fall-2021/v4',
  'https://chillhop.com/releases/fantompower-on-a-walk/',
  'https://chillhop.com/releases/middle-school-passing-notes/',
  'https://chillhop.com/releases/ruck-p-places/',
  'https://chillhop.com/releases/juan-rios-meraki/',
  'https://chillhop.com/releases/juan-rios-what-if-i-told-you/',
  'https://chillhop.com/releases/makzo-wanderlust/',
  'https://chillhop.com/releases/chillhop-music-sessions/',
  'https://chillhop.com/releases/toonorth-aftersome/',
  'https://chillhop.com/releases/toonorth-dreamstate/',
  'https://chillhop.com/releases/toonorth-lavish/',
  'https://chillhop.com/releases/sleepy-fish-mommy-kinship/',
  'https://chillhop.com/releases/misha-jussi-halme-bliss-a-felicidade-ep/',
  'https://chillhop.com/releases/chillhop-essentials-summer-2021/',
  'https://chillhop.webflow.io/releases/chillhop-essentials-summer-2021/v4',
  'https://chillhop.com/releases/evil-needle-sound-escapes/',
  'https://chillhop.com/releases/timezones-nostalgia/',
  'https://chillhop.com/releases/timezones-sunny-in-saint-petersburg/',
  'https://chillhop.com/releases/timezones-soul-samba/',
  'https://chillhop.com/releases/swum-cycles/',
  'https://chillhop.com/releases/cygn-into-the-past/',
  'https://chillhop.com/releases/cygn-lonely-waves/',
  'https://chillhop.com/releases/knowmadic-tba/',
  'https://chillhop.com/releases/chillhop-essentials-spring-2021/',
  'https://chillhop.com/releases/aarigod-forest-lore/',
  'https://chillhop.com/releases/psalm-trees-guillaume-muschalle-we-must-believe-in-spring/',
  'https://chillhop.com/releases/psalm-trees-guillaume-muschalle-desire/',
  'https://chillhop.com/releases/endless-sunday-vol-2/',
  'https://chillhop.com/releases/psalm-trees-guillaume-muschalle-who-knows/',
  'https://chillhop.com/releases/blue-wednesday-shopan-directions/',
  'https://chillhop.com/releases/mama-aiuto-today-feels-like-everyday/',
  'https://chillhop.com/releases/chillhop-yearmix-2020/',
  'https://chillhop.com/releases/makzo-anecdotes/',
  'https://chillhop.com/releases/the-field-tapes-loving-someone-you-lost/',
  'https://chillhop.com/releases/chillhop-essentials-winter-2020/',
  'https://chillhop.com/releases/l-indecis-sadtoi-les-mouvements-d-hiver/',
  'https://chillhop.com/releases/sworn-going-back/',
  'https://chillhop.com/releases/aviino-hologramophone/',
  'https://chillhop.com/releases/leavv-tales-of-a-flowing-forest/',
  'https://chillhop.com/releases/leavv-flushing-the-stairs/',
  'https://chillhop.com/releases/philanthrope-cabin-in-the-woods/',
  'https://chillhop.com/releases/no-signal/',
  'https://chillhop.com/releases/misha-jussi-halme-bliss/',
  'https://chillhop.com/releases/nymano-mirage/',
  'https://chillhop.com/releases/sleepy-fish-everything-fades-to-blue/',
  'https://chillhop.com/releases/sleepy-fish-colors-fade/',
  'https://chillhop.com/releases/canary-forest/',
  'https://chillhop.com/releases/montell-fish-imagination/',
  'https://chillhop.com/releases/ezzy-ny90/',
  'https://chillhop.com/releases/sitting-duck-friends-circle/',
  'https://chillhop.com/releases/paraglider/',
  'https://chillhop.com/releases/mo-anando-yesterday/',
  'https://chillhop.com/releases/endless-sunday-vol-1/',
  'https://chillhop.com/releases/sworn-reflection/',
  'https://chillhop.com/releases/clap-cotton-vinho-verde/',
  'https://chillhop.com/releases/aiguille-day-and-night/',
  'https://chillhop.com/releases/felty-movement/',
  'https://chillhop.com/releases/miscel-threads/',
  'https://chillhop.com/releases/delayde-little-spirit/',
  'https://chillhop.com/releases/odyssee-florent-garcia-calm/',
  'https://chillhop.com/releases/strehlow-cocktail-hour/',
  'https://chillhop.com/releases/last-night/',
  'https://chillhop.com/releases/chillhop-essentials-summer-2020/',
  'https://chillhop.com/releases/yasper-birds-fly-higher-than-the-moon/',
  'https://chillhop.com/releases/sadtoi-les-bonnes-choses/',
  'https://chillhop.com/releases/saudades-do-tempo-tracklib-compilation/',
  'https://chillhop.com/releases/psalm-trees-fiveyearsago/',
  'https://chillhop.com/releases/sitting-duck-hoffy-beats-fond-memories/',
  'https://chillhop.com/releases/swum-aries/',
  'https://chillhop.com/releases/in-my-bubble/',
  'https://chillhop.com/releases/no-spirit-snacks/',
  'https://chillhop.com/releases/invention-thaw/',
  'https://chillhop.com/releases/toonorth-far-from-home/',
  'https://chillhop.com/releases/cloudchord-g-mills-cruisin/',
  'https://chillhop.com/releases/weird-inside-doing-laundry/',
  'https://chillhop.com/releases/psalm-trees-guillaume-muschalle-bringmesun/',
  'https://chillhop.com/releases/sugi-wa-after-dark/',
  'https://chillhop.com/releases/sleepy-fish-beneath-your-waves/',
  'https://chillhop.com/releases/sleepy-fish-collages/',
  'https://chillhop.com/releases/sleepy-fish-watercolor/',
  'https://chillhop.com/releases/late-night-vibes-4/',
  'https://chillhop.com/releases/sleepy-fish-velocities/',
  'https://chillhop.com/releases/philanthrope-dayle-ocean-patio/',
  'https://chillhop.com/releases/arbour-aarigod-sundown/',
  'https://chillhop.com/releases/blue-wednesday-the-great-escape/',
  'https://chillhop.com/releases/hanz-leaving-for-good/',
  'https://chillhop.com/releases/no-spirit-reminiscing/',
  'https://chillhop.com/releases/moods-yasper-sofa-stories/',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',

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
  fs.writeFile('songs5.json', JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })

}

scraper()
