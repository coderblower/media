
const fs = require('fs');
const request = require('request');
const Nightmare = require('nightmare');




function downloader(url, destination){
    request(url)
    .pipe(fs.createWriteStream(destination))
    .on('close', ()=>{
        console.log('successfull inserted value')
    })
    .on('error', console.error)
}

const nightmare = new Nightmare(  {
    show: false,
    height: 3000,
    width: 1920
  });

function callScrapFn({Media}){
	
	let This = this;
	nightmare.goto('https://allonlinebanglanewspapers.com/details.php?id=65')
    .wait('.details')	
	.evaluate( function first() { return document.querySelector('.details').innerHTML})
    .end()
	.then((x)=>{ 
        let url = x.match(/\w+.jpg/g)[0]
        console.log(url)
        This.downloader('https://allonlinebanglanewspapers.com/source/upload/'+url, './public/'+url)
     })
	.catch((err) => {
		console.error(err)
	})

  }

module.exports = {
    downloader,callScrapFn
}