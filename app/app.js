const cv = require("opencv")

console.log("hello ioni")

const BASE_IMAGE   = '/srv/base_imgs/base.jpg'
const SEARCH_IMAGE = '/srv/search_imgs/search.jpg'

// 検出元の画像を読み込み
cv.readImage(BASE_IMAGE, function(err, baseImage) {
  if (err) return console.error('error loading image');
  baseImage.convertGrayscale()

  // 検出対象画像を読み込み、マッチングを行う
  cv.readImage(SEARCH_IMAGE, function(err, searchImage) {
    if (err) return console.error('error loading image');
    searchImage.convertGrayscale()

    let output = baseImage.matchTemplateByMatrix(searchImage, 3);
    let matches = output.templateMatches(0.99, 1.0, 5, false)
    console.log(matches)

    if (matches.length > 0) {
      console.log('match!')
    } else {
      console.log('unmatch!')
    }
  })
});
