
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
    show: true,
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





  function callScrapFn2(Embassy){

    
	
    

    function fetchData(arr, count=63){
        
        let nightmare = new Nightmare({show:true});
        let dataLength = arr.length;
        if(!arr[count]){return}
        nightmare
            .goto(arr[count])
            .wait('.tb5')
            .evaluate(()=> document.querySelector('.s4_t').innerHTML)
            .then(x=>{
              nightmare.evaluate(()=>document.querySelector('tr:nth-child(1)').innerHTML, ()=>document.querySelector('tr:nth-child(2)').innerHTML  )
              .end().then((x,y)=>{console.log(x,y)}).then((x)=>{
                console.log(x)
                if(count++ < dataLength){
                    return fetchData(arr, count)
                }
                
            })
            })
           
         
            
    }
    

    
	
	function start(nightmare){
        
        nightmare.goto('https://embassies.net/bangladesh')
        .wait('.s4_cn')
        .evaluate(()=>{
            
            let arr = [];
            let elm = document.querySelectorAll('.col-md-4');
            for(let i of elm){
                
                let link = i.querySelector('a').href;
                arr.push(link)
            }
            return arr;
        })
        .then((x)=>{
           return fetchData(x)
        })
        .then(x=> {
            
        })
    }
    
    start(new Nightmare({show:false}))
    // .wait()
    // .click('.col-md-4:nth-child('+count+') a')
    // .wait('.tb5')
	// .evaluate(()=>document.querySelector('.tb5').innerHTML)
 
     


    }


  

module.exports = {
    downloader,callScrapFn, callScrapFn2
}