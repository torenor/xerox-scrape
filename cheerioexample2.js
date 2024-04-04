const cheerio = require("cheerio")

const html = `
<div  id="main">
  <div class="content1">
    <h2>Status</h2>
  </div>
  <div id="F1" >
    <div class="description">
      <p>some info</p>
    </div>
  </div>
  <div class="content2">
    <h2>Status</h2>
  </div>
</div>
`;
const $ = cheerio.load(html);

// approach 1
console.log([...$("#main > div").not("#F1")]
  .map(e => $(e).text().trim()));

// approach 2
console.log([...$("#main > div:not(#F1)")]
  .map(e => $(e).text().trim()));

// approach 3
console.log([...$("#main [class^='content']")]
  .map(e => $(e).text().trim()));

// approach 4 (destructive)
$("#F1").remove();
console.log([...$("#main > div")]
  .map(e => $(e).text().trim()));

