const jsdom = require('jsdom')

const { JSDOM } = jsdom;
exports.isPriceAvailable = async(priceHtmlData) => {
    let msg = {isAvailable: false, data: null}
  try {
   let dom = new JSDOM('<table>'+priceHtmlData+'</table>');
   const tr = dom.window.document.querySelectorAll('tr');
    let currencies = [];
    let prices = [];
    let pairs = new Map();
    let data = [];
    let trCount = 0;

   if (tr.length > 5) {

    tr.forEach(elem => {
        const td = elem.querySelectorAll('td');
        if (td.length > 0) {
        const currencyElem = elem.querySelector('.currencyBlock-gjg3vUXR')
        const currency = currencyElem.textContent;
        currencies.push(currency)
      }
     
      });


      tr.forEach(elem => {
        const td = elem.querySelectorAll('td');
        if (td.length > 0) {
        //console.log(currency)
        let tdCount = 0;
        td.forEach(tdElem => {
          let price = tdElem.textContent;
           prices.push(price)
           if (trCount > 0 && price != '-') {
              //start pairing
              if (trCount == tdCount) {
                //set starting currency pair
                let pair = currencies[0]+'/'+currencies[trCount];
                pairs.set(pair, prices[tdCount])
                data.push({"pair": pair, "price": prices[tdCount]})
              } else {
                //set currency pair
                let cpair = currencies[trCount]+'/'+currencies[tdCount];
                pairs.set(cpair, price)
                data.push({"pair": cpair, "price": price})
              }
           } 
           tdCount++;
        })
        trCount++;
      }
     
      });

      //console.log(pairs)
      //console.log(pairs)
   }

   const len = currencies.length;
   if (pairs.size == (len * (len - 1)) ) {
    msg.data = data;
    msg.isAvailable = true;
   } else {
    console.log('len: '+len+"  size: "+pairs.size)
   }
 
     
  } catch (e) {
    console.log('isPriceAvailable error: '+e)
  }

  //console.log(msg.data)
 return msg;

}