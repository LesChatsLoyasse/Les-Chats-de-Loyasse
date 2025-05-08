const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const ejs = require('ejs');
const sheets = require('@googleapis/sheets');

async function fetchSheetData(spreadsheetId, googleAPIKey) {
  const gsheets = sheets.sheets({
    version: 'v4',
    auth: googleAPIKey,
  });

  // spreadsheet ID is not given for security good practices
  // sheets name is OK, we can hardcode them
  // ranges are also hardcoded, we expect one specific organization of the sheet to read info
  try {
    const responses = await Promise.all([
      gsheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'adoption!A2:F',
      }),
      gsheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'actions!A2:F',
      }),
      gsheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'nouvelles-chats!A2:C',
      }),
      gsheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'chats-partis!A2:C',
      }),
    ]);

  return {
      adoptionRows: responses[0].data.values,
      actionsRows: responses[1].data.values,
      newsRows: responses[2].data.values,
      goneCatsRows: responses[3].data.values,
    }
  } catch (error) {
    if (error.response) {
      // console.error(`API error: ${error.response.status}: ${error.response.statusText}`);
      const res = error.response;
      console.error(`${error.status} Something wrong occured when fetching sheet data : ${error.statusText}`);
      console.error(res.data);
    } else { console.error('Error:', error.message); }
  }
}


// Post-processing: all links coming from Google Drive image sharing are rewritten
// thanks to regex so that a direct link is used in HTML tags
function _postProcessImageSources (imagesSources) {
  const RE_DRIVE_IMAGE_ID = /https:\/\/drive.google.com\/file\/d\/(?<IMAGE_ID>[\w-]+)(?:\/.+)?/;
  return imagesSources.map((source) => {
    let regexMatching = RE_DRIVE_IMAGE_ID.exec(source);
    if (!regexMatching || !regexMatching.groups) return source;
    return `https://lh3.googleusercontent.com/d/${regexMatching.groups.IMAGE_ID}`;
  })
}

function processSheetsData(rows) {
  const adoptionData = rows.adoptionRows.map((row, i) => {
    // Expected columns:
    // nom ; age ; genre ; citation ; description ; images
    return {
      id: i + 1,
      name: row[0],
      age: row[1],
      gender: row[2],
      quote: row[3],
      description: row[4],
      imagesSrc: _postProcessImageSources(row[5].split(' '))
    }
  });

  const newsParsingFn = (row, i) => {
    return {
      id: i + 1,
      title: row[0],
      description: row[1],
      imagesSrc: _postProcessImageSources(row[2].split(' '))
    }
  }
  const newsData = rows.newsRows.map(newsParsingFn)
  const ripData = rows.goneCatsRows.map(newsParsingFn)

  const actionsData = rows.actionsRows.map((row, i) => {
    // Expected columns:
    // titre ; description ; images ; highlight ; bouton d'action ; lien
    return {
      id: i + 1,
      title: row[0],
      description: row[1],
      imagesSrc: _postProcessImageSources(row[2].split(' ')),
    }
  });

  return {
    highlightAdoptionData: adoptionData.slice(0, 6),
    adoptionData: adoptionData,
    newsData: newsData,
    ripData: ripData,
    latestActionsData: actionsData.slice(0, 6),
    archivedActionsData: actionsData.slice(6),
  }
}

function renderPages(sourceDir, outputDir, contentData) {
  const pagesDir = path.join(sourceDir, 'views/pages');
  const pages = glob.sync('**/*.ejs', { cwd: pagesDir });

  console.log('Building the different pages ...')
  pages.forEach(page => {
    const templatePath = path.join(pagesDir, page);
    const outputPath = path.join(outputDir, page.replace('.ejs', '.html'));

    const getRelativePath = (path) => {
      const depth = page.split('/').length - 1;
      const prefix = depth > 0 ? '../'.repeat(depth) : './';
      return prefix + path;
    }

    const data = {
      getRelativePath: getRelativePath,
      relativeRoot: getRelativePath(''),

      ...contentData,
    }

    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));

    // Render the EJS template
    console.log(`\t- building ${outputPath} from ${page}`);
    ejs.renderFile(templatePath, data, {
      root: path.join(sourceDir, 'views'),
      views: [path.join(sourceDir, 'views')]
    }, (err, html) => {
      if (err) {
        console.error(`Error processing ${page}`, err);
        return;
      }

      // Write HTML to output file
      fs.writeFileSync(outputPath, html);
    });
  });
}

(async () => {
  const args = process.argv.slice(2).slice()
  const sourceDir = path.join(process.cwd(), args[0] || 'src');
  const outputDir = path.join(process.cwd(), args[1] || 'public');

  const googleAPIKey = process.env.GSHEETS_API_KEY;
  const spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID;

  if (!googleAPIKey || !spreadsheetId) {
    console.error(`
      Both $GSHEETS_API_KEY and $GSHEETS_SPREADSHEET_ID need to be defined as environment variables.
      Current values : 
        GSHEETS_API_KEY = ${'*******' + googleAPIKey.slice(6)}
        GSHEETS_SPREADSHEET_ID = ${'*******' + spreadsheetId.slice(6)}
    `)
  }

  let sheetsRows = await fetchSheetData(spreadsheetId, googleAPIKey);
  let contentData = processSheetsData(sheetsRows)

  // Ensure the output directory exists and is empty
  fs.ensureDirSync(outputDir);
  fs.emptyDirSync(outputDir); 

  renderPages(sourceDir, outputDir, contentData);
})();