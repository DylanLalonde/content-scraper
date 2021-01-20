const puppeteer = require('puppeteer');
const io = require('../io/io.js');

init();

function init() {
  io.readJson('./data/data.json', performUrlLookups);
    
  async function performUrlLookups (err, jsonData) {
    let new_data = [];
  
    if (err) return console.log(err);
  
    for (let i = 0; i < jsonData.length; i++) {
  
      let article_url = jsonData[i].url;
      
      console.log("checking new article: ", article_url);
      
      let browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(article_url, { waitUntil: 'networkidle2' });
      
      new_data.push(await getScrapedData(page, article_url));
  
      await browser.close();

      io.writeData(new_data); // overwrites the file each time
    }
    // io.writeData(new_data); // only writes once at the end
  };
  
  async function getScrapedData(page, article_url) {
    
    let scrapedArticleData = {};
    
    scrapedArticleData["url"] = article_url;
    scrapedArticleData["body_content"] = await bodyContent(page);
    
    return scrapedArticleData;
  }
}