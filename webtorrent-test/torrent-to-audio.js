var WebTorrent = require('webtorrent')

var client = new WebTorrent()
var magnetUri = 'badacc9f73671c99ab0d65557b8fb2878cbfdbd5'

client.add(magnetUri, function (torrent) {
  // Got torrent metadata!
  console.log('Client is downloading:', torrent.infoHash)

  torrent.files.forEach(function (file) {
    console.info(file)
    file.appendTo('body');
  })
})