var ENV = (process.argv[2]=="test") ? "test" : "live"
var config = require("./package.json");
console.log(`starting ${ENV} task`)
var https = require("https");
var htmlparser = require('htmlparser');
var select = require('soupselect').select;
//Psuedo Code

// 1. Hit site
// 2. does product list button 'productbuy.js-e2e-add-basket' has text "Out of stock"
//   IF YES, wait, then loop
//   IF NO, hit web service to notify, wait for confirmation, close.
// 3. Run forever
// console.log(config.config[ENV])
// var options = {
//   host: config.config.host,
//   method:'GET',
//   path: config.config[ENV]
// };

function ringBell(){
  setInterval(()=>{
    console.log("\007");
  },1000)
}

function main(){
  console.log("hitting "+config.config[ENV])
  var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error)
          process.exit()
      else
          console.log("done")
  });
  var parser = new htmlparser.Parser(handler);


  https.get(config.config[ENV], function(res) {
    var page = ""
    //console.log("Got response: " + res.statusCode);
    res.on('data', function(e) {
      page+=e
    });
    res.on("end",function(){
      //console.log(page)
      parser.parseComplete(page);
      var isSoldOut = select(handler.dom,'span.cat-button.soldout');
      if (isSoldOut.length>0){
        if(isSoldOut[0].children[0].raw.includes("Out Of Stock")){
          console.log("Out Of Stock")
          main()
        }
      } else {
        console.log("Potentially In Stock")
        ringBell()

        //hit notification service

      }

    })
  }).on('error', function(e) {
    console.log("Got error: " + e);
  })
}

main()
