const cv = require("opencv")

console.log("hello ioni")

const BASE_IMAGE_PATH   = '/srv/base_imgs/base.jpg'

let searchImagePaths = [
  '/srv/search_imgs/search1.jpg',
  '/srv/search_imgs/search2.jpg',
  '/srv/search_imgs/search3.jpg'
]

// 検出元の画像を読み込み
cv.readImage(BASE_IMAGE_PATH, function(err, baseImage) {
  if (err) return console.error('error loading image');
  baseImage.convertGrayscale()

  var results = []
  for (var searchImagePath of searchImagePaths) {
    // 検出対象画像を読み込み、マッチングを行う
    cv.readImage(searchImagePath, function(err, searchImage) {
      if (err) return console.error('error loading image');
      searchImage.convertGrayscale()

      let output = baseImage.matchTemplateByMatrix(searchImage, 3);
      let matches = output.templateMatches(0.99, 1.0, 5, false)
      console.log(matches)

      if (matches.length > 0 && typeof(matches[0]) != 'undefined') {
        console.log('match!')
        results.push(true)
      } else {
        console.log('unmatch!')
        results.push(false)
      }
    })
  }
  console.log(results)
})
