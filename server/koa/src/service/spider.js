const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require("fs");

async function getData(cookie) {
  let htmlText = await new Promise((resolve, reject) => {
    superagent
      .post("https://cn.investing.com/indices/indices-futures")
      .set({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36 Edg/93.0.961.38",
      })
      .set({ cookie: cookie })
      .timeout({
        response: 10000, // Wait 5 seconds for the server to start sending,
        deadline: 60000, // but allow 1 minute for the file to finish loading.
      })
      .end((req, res) => {
        console.log("save response");
        resolve(res.text);
      });
  });

  let $ = cheerio.load(htmlText);
  let tableHtml = $(".table-browser_table-browser-wrapper__2ynbE").html();
  fs.writeFileSync(__dirname + "store.txt", htmlText || "");
  return tableHtml;
}

module.exports = getData;
