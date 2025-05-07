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


  console.log('Building the different pages ...')
  pages.forEach(page => {
    const getRelativePath = (path) => {
      const depth = page.split('/').length - 1;
      const prefix = depth > 0 ? '../'.repeat(depth) : './';
      return prefix + path;
    }

    const latestActionsData = [
      { id: "1", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", imageSrc: getRelativePath('assets/temp/adoption1.jpg'), description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité."},
      { id: "2", title: "Luna", imageSrc: getRelativePath('assets/temp/adoption1.jpg'), description: "Luna est une boule d'amour..." },
      { id: "3", title: "L'operation de PAO", imageSrc: getRelativePath('assets/temp/adoption2.jpg'), description: "Rocky est un jeune chat plein d'énergie..." },
      { id: "4", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", imageSrc: getRelativePath('assets/temp/adoption1.jpg'), description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité."},
      { id: "5", title: "Luna", imageSrc: getRelativePath('assets/temp/adoption1.jpg'), description: "Luna est une boule d'amour..." },
      { id: "6", title: "L'operation de PAO", imageSrc: getRelativePath('assets/temp/adoption2.jpg'), description: "Rocky est un jeune chat plein d'énergie..." },
    ];

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
      getRelativePath: getRelativePath,
      relativeRoot: getRelativePath(''),

      // Data fields
      // Mocked temporarily
      
      adoptionCats: [
        { name: 'Shadow',    gender: 'male',     imageSource: getRelativePath('assets/temp/adoption1.jpg') },
        { name: 'Rusty',     gender: 'male',     imageSource: getRelativePath('assets/temp/adoption2.jpg') },
        { name: 'Luna',      gender: 'femelle',  imageSource: getRelativePath('assets/temp/adoption1.jpg') },
        { name: 'James',     gender: 'male',     imageSource: getRelativePath('assets/temp/adoption2.jpg') },
        { name: 'Joe',       gender: 'male',     imageSource: getRelativePath('assets/temp/adoption1.jpg') },
        { name: 'Mary',      gender: 'femelle',  imageSource: getRelativePath('assets/temp/adoption2.jpg') },
      ],

      adoptionData: [
        { id: "1", name: "BLAA",      age: "8 ans", quote: '"J\'aime les humains et être proche d\'eux"', gender: "male", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), photos: "assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg assets/temp/adoption1.jpg", description: "Blablabla est un chat d'un calme olympien, Blablabla est un chat d'un calme olympien,Blablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympien Blablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympienBlablabla est un chat d'un calme olympien" },
        { id: "2", name: "Tanguy",    age: "3 ans", quote: '"Je suis douce et câline."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "3", name: "Rocky",     age: "2 an", quote: '"J\'adore jouer et explorer!"', gender: "male", imageSrc: getRelativePath("assets/temp/adoption2.jpg"), description: "Rocky est un jeune chat plein d'énergie..." },
        { id: "4", name: "Sophie",    age: "7 ans", quote: '"J\'aime les siestes au soleil."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "5", name: "Max",       age: "4 ans", quote: '"Toujours prêt pour une aventure."', gender: "male", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "5", name: "Chloe",     age: "6 ans", quote: '"Je suis très attachée à ma famille."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "6", name: "Misty",     age: "4 ans", quote: '"J\'aime observer le monde depuis une fenêtre."', gender: "femelle" },
        { id: "7", name: "Marty",     age: "8 ans", quote: '"J\'aime les humains et être proche d\'eux"', gender: "male", imageSrc: "", description: "Marty est un chat d'un calme olympien..." },
        { id: "8", name: "Luna",      age: "3 ans", quote: '"Je suis douce et câline."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "9", name: "Rocky",     age: "12 an", quote: '"J\'adore jouer et explorer!"', gender: "male", imageSrc: getRelativePath("assets/temp/adoption2.jpg"), description: "Rocky est un jeune chat plein d'énergie..." },
        { id: "10", name: "Sophie",   age: "7 ans", quote: '"J\'aime les siestes au soleil."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "11", name: "Max",      age: "4 ans", quote: '"Toujours prêt pour une aventure."', gender: "male", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "12", name: "Chloe",    age: "6 ans", quote: '"Je suis très attachée à ma famille."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "13", name: "Simba",    age: "10 ans", quote: '"Un vieux sage plein d\'amour."', gender: "male", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "14", name: "Mia",      age: "10", quote: '"J\'ai beaucoup d\'énergie à dépenser."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "15", name: "Garfield", age: "5 ans", quote: '"Lasagnes et siestes, que demander de plus ?"', gender: "male", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "16", name: "Nala",     age: "8", quote: '"Exploratrice dans l\'âme."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "" },
        { id: "17", name: "Felix",    age: "3 ans", quote: '"Un peu timide mais très affectueux une fois en confiance."', gender: "male", imageSrc: getRelativePath("assets/temp/adoption2.jpg"), description: "Luna est une boule d'amourrrrrrrrrrrrrrrrrrrrrr" },
        { id: "18", name: "Misty",    age: "4", quote: '"J\'aime observer le monde depuis une fenêtre."', gender: "femelle", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
      ],

      newsData: [
        { id: "1", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: [getRelativePath("assets/temp/adoption1.jpg"), getRelativePath("assets/temp/adoption2.jpg"), getRelativePath("assets/temp/adoption1.jpg"), getRelativePath("assets/temp/adoption2.jpg")] },
        { id: "2", title: "Luna", imageSrc: [getRelativePath("assets/temp/adoption1.jpg")], description: "Luna est une boule d'amour..." },
        { id: "3", title: "L'operation de PAO", imageSrc:[getRelativePath("assets/temp/adoption2.jpg")], description: "Rocky est un jeune chat plein d'énergie..." },
        { id: "4", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: [getRelativePath("assets/temp/adoption1.jpg")] },
        { id: "5", title: "Luna 2", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
        { id: "6", title: "L'operation de PAO", imageSrc: getRelativePath("assets/temp/adoption2.jpg"), description: "Rocky est un jeune chat plein d'énergie..." },
      ],

      ripData: [
        { id: "1", title: "Courageuse Daisy ❤️‍🩹", description: "Daisy, courageuse et douce Daisy, petite minette des rues recueillie par l’association à l’âge d’un an dans un très mauvais état de santé… Nous l’avons entourée d’amour et de bons soins, mais la maladie a eu raison d’elle. Lorsque nous l’avons recueillie, elle a tout de suite fait confiance et aimé les humains qui se sont occupés d’elle ! Elle adorait être brossée, elle a rapidement aimé la chaleur et le confort d’un intérieur chaud et moelleux. Elle a même appris à jouer et à profiter de la vie. Daisy avait énormément d’amour à donner ! Elle ronronnait comme tout dès que l’on s’approchait d’elle, avant même que l’on ait commencé à la caresser. Elle a fait le bonheur de tous les humains qui ont croisé son chemin, notamment Stéphane, Nina et Béatrice, et même les vétérinaires, et les assistantes vétérinaires ! Un ange notre Daisy… Nous lui avons donné de l’amour et des soins pour qu’elle puisse un jour connaître la joie d’un foyer définitif… Elle n’avait que deux ans lorsqu’elle nous a quitté, elle laisse un grand vide auprès de ceux qui l’ont connu, elle avait tant d’amour à donner. Repose en paix notre Daisy, loin de la maladie et la souffrance.", imageSrc: [getRelativePath("assets/temp/rip/Daisy-4.jpg"), getRelativePath("assets/temp/rip/Daisy-5.jpg"), getRelativePath("assets/temp/rip/Daisy-3.jpg"), getRelativePath("assets/temp/rip/Daisy-6.jpg")] },
        { id: "2", title: "Une nouvelle étoile 🌟", imageSrc: [getRelativePath("assets/temp/adoption1.jpg")], description: "Luna est une boule d'amour..." },
        { id: "3", title: "L'operation de PAO", imageSrc:[getRelativePath("assets/temp/adoption2.jpg")], description: "Rocky est un jeune chat plein d'énergie..." },
        { id: "4", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: [getRelativePath("assets/temp/adoption1.jpg")] },
        { id: "5", title: "Luna 2", imageSrc: getRelativePath("assets/temp/adoption1.jpg"), description: "Luna est une boule d'amour..." },
      ],

      latestActionsData: latestActionsData,
      archivedActionsData: latestActionsData.slice(-1)
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