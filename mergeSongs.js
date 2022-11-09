const fs = require('fs')
const songs = require('./songs.json')
const songs2 = require('./songs2.json')
const songs3 = require('./songs3.json')
const songs4 = require('./songs4.json')
const songs5 = require('./songs5.json')
const songs6 = require('./songs6.json')
const songs7 = require('./songs7.json')
const songs8 = require('./songs8.json')
const songs9 = require('./songs9.json')

// merge songs into one single array with no duplicates in finalSongs.json
const mergeSongs = () => {
  let mergedSongs = songs.concat(songs2, songs3, songs4, songs5, songs6, songs7, songs8, songs9)
  mergedSongs = [...new Set(mergedSongs)]
  fs.writeFile('finalSongs.json', JSON.stringify(mergedSongs), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}

mergeSongs()
