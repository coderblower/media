const Nightmare = require('nightmare');
const fs = require('fs');
const nightmare = Nightmare({
  show: true,
  openDevTools: true,
});

nightmare.goto('https://in.news.yahoo.com/')
  .wait(1000)
  .then(function(rects){
    
  })
  .evaluate(getBounds, '.Cf')
  .then(function(rects) {

    function getScreenshot(rects, index) {
      if (index == rects.length) return;
      nightmare.scrollTo(rects[index].y, 0)
        .screenshot(__dirname + '/images/navbar' + index + '.png', {
          //60 is height of the top element which remains
          x: rects[index].x-10,
          y: 60,
          width: rects[index].width+30,
          height: rects[index].height +60
        })
        .then(function() {
          console.log("Calling next. " + index);
          getScreenshot(rects, index + 1);
        }).catch(function(err) {
          console.log(err);
        })
    };

    getScreenshot(rects, 0);
  })
  .catch(function(err) {
    console.log(err);
  });

function getBounds(selector) {
  var elements = document.querySelectorAll(selector);
  if (elements && elements.length > 0) {
    var arr = [];
    const r = Math.round;
    for (var ii = 0; ii < elements.length; ii++) {
      var rect = elements[ii].getBoundingClientRect();
      arr.push({
        x: r(rect.left),
        y: r(rect.top),
        width: r(rect.width),
        height: r(rect.height)
      })
    }
    console.log("Elements found: ", arr.length);
    return arr;
  }
  return null;
}