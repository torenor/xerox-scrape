const cheerio = require("cheerio"); // 1.0.0-rc.12

const html = `<table class="summary">
<tbody><tr>
    <th>Created</th>
    <th>Client</th>
    <th>Owner</th>
    <th>Ref</th>
    <th>Email Address</th>
    <th>Postal Address</th>

</tr>
<tr>
    <td>Created</td>
    <td>Client</td>
    <td>Owner</td>
    <td>Ref</td>
    <td>Email</td>
    <td>Postal Address</td>

</tr>
</tbody></table>
<hr>
<table>
<tbody><tr>
    <th>Title</th>
    <th>Content</th>
    <th>Statement</th>
</tr>
        <tr>
            <td>
                <div>
                    <a class="packageTitle" onclick="openPackageDetail(&quot;&quot;)" title="Click for detail">{TITLE}</a>
                </div>
            </td>
            <td>
                <div>
                            <div>
                                {CONTENT1}
                            </div>
                                <div class="lighter smaller">Containing:</div>
                                <div>
                                            <div class="smaller">
                                                Early Bird Guest (1)
                                            </div>

                                </div>

                </div>
            </td>
            <td>
                <table class="smaller statement">
                    <tbody><tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th style="padding-right:1em">Cost</th>
                        <th style="padding-right:1em">Payment</th>
                        <th>Balance</th>
                    </tr>
                            <tr>
                                <td>dATE AND TIME</td>
                                <td>DESCRIPTION</td>
                                <td>COST</td>
                                <td>PAYMENT</td>
                                <td>BALANCE</td>
                                </tr>
                            <tr>
                                <td>DATE</td>
                                <td>DESCRIPTION</td>
                                <td>COST</td>
                                <td>PAYMENT</td>
                                <td>BALANCE</td>
                                </tr>

            </tbody></table>
        </td>
        </tr>

</tbody></table>

</div>
`;

const parseTables = root => {
  const headers = [...$(root).find("> tbody > tr > th")].map(
    th => $(th).text().trim()
  );
  return [...$(root).find("> tbody > tr:has(td)")].map(tr =>
    Object.fromEntries(
      [...$(tr).find("> td")].map((td, i) => {
        if ($(td).find("> table").length === 1) {
          return [
            headers[i],
            parseTables($(td).find("> table").get(0)),
          ];
        }

        return [headers[i], $(td).text().trim()];
      })
    )
  );
};

const $ = cheerio.load(html);
const data = [...$("body > table")].map(parseTables);

require("util").inspect.defaultOptions.depth = null;
console.log(data);