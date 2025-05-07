const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const ejs = require('ejs');

const args = process.argv.slice(2).slice()
const srcDir = path.join(process.cwd(), args[0] || 'src');
const outputDir = path.join(process.cwd(), args[1] || 'public');

// Ensure the output directory exists and is empty
fs.ensureDirSync(outputDir);
fs.emptyDirSync(outputDir);



(() => {
  const pagesDir = path.join(srcDir, 'views/pages');
  const pages = glob.sync('**/*.ejs', { cwd: pagesDir });

  console.log(`pagesDir = ${pagesDir}`);
  console.log(`pages = ${pages}`);

  console.log('Building the different pages ...')
  pages.forEach(page => {
    const data = {

      // Helping functions for templating 
      defineLayoutContent: function(contentName, contentFn) {
        if (!this.contentBlocks) this.contentBlocks = {};
        this.contentBlocks[contentName] = contentFn();
      },
      getLayoutContent: function(contentName) {
        return this.contentBlocks && this.contentBlocks[contentName]
              ? this.contentBlocks[contentName]
              : '';
      },
      getRelativePath: function(path) {
        const depth = page.split('/').length - 1;
        const prefix = depth > 0 ? '../'.repeat(depth) : './';
        return prefix + path;
      },
  
      // Real data fields 
      adoptionCats: [],
      adoptionData: [],
    };
    
    const templatePath = path.join(pagesDir, page);
    const outputPath = path.join(outputDir, page.replace('.ejs', '.html'));
    
    // Ensure output directory exists
    fs.ensureDirSync(path.dirname(outputPath));
    
    // Render the EJS template
    console.log(`\t- building ${outputPath} from ${page}`);
    ejs.renderFile(templatePath, data, {
      root: path.join(srcDir, 'views'),
      views: [path.join(srcDir, 'views')]
    }, (err, html) => {
      if (err) {
        console.error(`Error processing ${page}`, err);
        return;
      }
      
      // Write HTML to output file
      fs.writeFileSync(outputPath, html);
    });
  });

})();