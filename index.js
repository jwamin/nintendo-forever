var ENV = (process.argv[2]=="test") ? "dev" : "live"

console.log(`starting ${ENV} task`)

//Psuedo Code

// 1. Hit site
// 2. does product list button 'productbuy.js-e2e-add-basket' have text "Pre-Order Now"
//   IF YES, hit web service to notify, wait for confirmation, close.
//   IF NO, wait 30secs, then loop
// 3. Run forever
