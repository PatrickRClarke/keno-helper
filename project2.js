const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const day = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#hotspotSearch > div:nth-child(2) > div > div > div > div.card-body.d-flex.justify-content-around > p.htspt__cards--next-draw-date > strong.caps-texts")).map( x => x.textContent)
    })

    const time = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#hotspotSearch > div:nth-child(2) > div > div > div > div.card-body.d-flex.justify-content-around > p.htspt__cards--next-draw-date > strong:nth-child(3)")).map( x => x.textContent)
    })

    const number = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#hotspotSearch > div > div > div > div > div.card-body.d-flex.justify-content-around > p.htspt__cards--current-num > strong")).map( x => x.textContent)
    })

    const yellow = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#hotspotSearch > div > div > div > div > div.card-body.d-flex.justify-content-around > ul > li.yellow-num")).map( x => x.textContent)
    })

    const blue = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#hotspotSearch > div > div > div > div > div.card-body.d-flex.justify-content-around > ul > li.blue-num")).map( x => x.textContent)
    })

    let first = "game(\"" + day.toString() + "\", \"" + time.toString() + "\",";
    let c = "\b,";
    let b1 = "{";
    let b2 = "\b});";
    let both =
    "\b" + blue.concat(yellow);

    console.log(first,number.toString(),c,yellow.toString(),c,b1,both.toString(),b2);

    browser.close();
}

scrapeProduct('https://www.calottery.com/draw-games/hot-spot/past-winning-numbers?query=2941209');