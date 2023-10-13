const puppeteer = require('puppeteer-extra')
const priceHelpers = require('./PriceHelpers')
const SocketHelpers = require('./SocketHelpers')
class PriceExtrator{
  
    constructor() {
        this.urlSource = "https://www.tradingview-widget.com/embed-widget/forex-cross-rates/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A500%2C%22currencies%22%3A%5B%22EUR%22%2C%22USD%22%2C%22JPY%22%2C%22GBP%22%2C%22CHF%22%2C%22AUD%22%2C%22CAD%22%2C%22NZD%22%2C%22CNY%22%5D%2C%22utm_source%22%3A%22%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%2C%22page-uri%22%3A%22__NHTTP__%22%7D";
        this.browser = null;
        this.page = null;
    }

  setup = async() => {
    try {
        this.browser = await puppeteer.launch({headless: 'new'});
        this.page = await this.browser.newPage();
    } catch (e) {
     console.log(e)
    }
  }

    
startPriceExtrator = async() => {
    try {
      await this.setup();
      await this.page.goto(this.urlSource);
      console.log('started!')
      this.processPriceData();
     // setTimeout(async() => {
     
     //console.log('result: '+JSON.stringify(priceAv))
    //}, 5000)
    
    } catch (e) {
     console.log('startPriceExtrator error: '+e)
    }
}


getPriceData = async() => {
    try {
        const priceSelector = ".table-ae3EQWDL";
      const element = await this.page.$(priceSelector);
      const priceData = await this.page.evaluate(el => el.innerHTML, element)
      return priceData;
    } catch (e) {
      console.log('getPriceData error: '+e)  
     return null;
    }
}


processPriceData = async() => {
    try {
        
        const priceData = await this.getPriceData();
        const priceAv = await priceHelpers.isPriceAvailable(priceData)
        if (priceAv.isAvailable) {
           //console.log(priceAv.data)
           SocketHelpers.sendPricesToConnections(JSON.stringify(priceAv.data));
        } else {
           console.log('Price Not Available!')
        }
       
        setTimeout(() => {
            this.processPriceData();
        },1000)
        

    } catch (e) {
     console.log('processPriceData error: '+e)
    }
}


};

module.exports = PriceExtrator;
