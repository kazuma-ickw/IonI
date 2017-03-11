const cv = require("opencv")

console.log("hello ioni")

// console.log(cv)

// 検出元の画像を読み込み
cv.readImage('/srv/base_imgs/base_img.png', function(err, im) {
  if (err) return console.error('error loading image');

  // 検出対象画像を指定して、検出元画像から検出する
  var output = im.matchTemplate('/srv/search_imgs/search_img.png', 3);
  console.dir(output)
  console.log(output[0])

  // matchTemplateの結果配列から検出結果の座標とサイズを取得
  let startX = output[1];
  let startY = output[2];
  let width  = output[3];
  let height = output[4];

  console.log("startX:" + startX)
  console.log("startY:" + startY)
  console.log("width:" + width)
  console.log("height:" + height)

  // 検出元画像に検出された位置をrectangleとして描画して保存する
  let copy = im.copy()
  copy.rectangle([startX, startY], [width, height], [0,255,0], 2)
  copy.save('/srv/search_imgs/result.png')
});
