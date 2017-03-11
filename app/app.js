const cv = require("opencv")

console.log("hello ioni")

// console.log(cv)

cv.readImage('/srv/base_imgs/base_img.png', function(err, im) {
  if (err) return console.error('error loading image');

  var output = im.matchTemplate('/srv/search_imgs/search_img.png', 3);
  console.dir(output)
  console.log(output[0])

  let startX = output[1];
  let startY = output[2];
  let width  = output[3];
  let height = output[4];

  console.log("startX:" + startX)
  console.log("startY:" + startY)
  console.log("width:" + width)
  console.log("height:" + height)

  let copy = im.copy()

  copy.rectangle([startX, startY], [width, height], [0,255,0], 2)

  copy.save('/srv/search_imgs/result.png')
});
