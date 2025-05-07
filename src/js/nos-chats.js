document.addEventListener("DOMContentLoaded", () => {

    // --- Configuration ---
    let currentPage = 1;
    const itemsPerPage = 3;
    const animationDuration = 200;
    const scrollDelay = 200;
    let isTransitioning = false;
    let totalPages = 1; // Initialisé à 1, sera recalculé
    let allDataMap = new Map();
    let counter = 0;
    let nextCarousel = "";
    let prevCarousel = "";

    // --- DOM Elements ---

    // Vues principales
    const nouvellesList = document.getElementById("liste-nouvelles");
    const nouvellesListSection = document.querySelector(".section-nouvelles-chats");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const paginationNav = document.getElementById('pagination-section');
    const pageNouvelles = document.getElementById('page-nouvelles-chats');
    const allData = pageNouvelles === null ? getAllRipData() : getAllNewsData();

    // --- Vérification initiale des éléments DOM essentiels ---
    if (!nouvellesList || !paginationNav || !prevButton || !nextButton) {
        console.error("ERREUR CRITIQUE : Un ou plusieurs éléments DOM essentiels sont introuvables. Vérifiez les IDs HTML.");
        // Peut-être afficher un message à l'utilisateur ici
        document.body.innerHTML = "<p style='color:red; padding: 20px;'>Erreur critique : Impossible d'initialiser l'application. Veuillez contacter le support.</p>";
        return; // Arrêter l'exécution
    }

    // TEMP Fonction pour obtenir TOUTES les données (simulé ici)
    // imageSrc MUST be an array
    function getAllNewsData() {
        // Ajout de plus de données pour bien tester la pagination
        return [
            { id: "1", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: ["/assets/temp/adoption1.jpg", "/assets/temp/adoption2.jpg", "/assets/temp/adoption1.jpg", "/assets/temp/adoption2.jpg"] },
            { id: "2", title: "Luna", imageSrc: ["/assets/temp/adoption1.jpg"], description: "Luna est une boule d'amour..." },
            { id: "3", title: "L'operation de PAO", imageSrc:["/assets/temp/adoption2.jpg"], description: "Rocky est un jeune chat plein d'énergie..." },
            { id: "4", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: ["/assets/temp/adoption1.jpg"] },
            { id: "5", title: "Luna 2", imageSrc: "/assets/temp/adoption1.jpg", description: "Luna est une boule d'amour..." },
            { id: "6", title: "L'operation de PAO", imageSrc: "/assets/temp/adoption2.jpg", description: "Rocky est un jeune chat plein d'énergie..." },
        ];
    }
    //TEMP 
    function getAllRipData() {
        console.log('HERE')
        return [
            { id: "1", title: "Courageuse Daisy ❤️‍🩹", description: "Daisy, courageuse et douce Daisy, petite minette des rues recueillie par l’association à l’âge d’un an dans un très mauvais état de santé… Nous l’avons entourée d’amour et de bons soins, mais la maladie a eu raison d’elle. Lorsque nous l’avons recueillie, elle a tout de suite fait confiance et aimé les humains qui se sont occupés d’elle ! Elle adorait être brossée, elle a rapidement aimé la chaleur et le confort d’un intérieur chaud et moelleux. Elle a même appris à jouer et à profiter de la vie. Daisy avait énormément d’amour à donner ! Elle ronronnait comme tout dès que l’on s’approchait d’elle, avant même que l’on ait commencé à la caresser. Elle a fait le bonheur de tous les humains qui ont croisé son chemin, notamment Stéphane, Nina et Béatrice, et même les vétérinaires, et les assistantes vétérinaires ! Un ange notre Daisy… Nous lui avons donné de l’amour et des soins pour qu’elle puisse un jour connaître la joie d’un foyer définitif… Elle n’avait que deux ans lorsqu’elle nous a quitté, elle laisse un grand vide auprès de ceux qui l’ont connu, elle avait tant d’amour à donner. Repose en paix notre Daisy, loin de la maladie et la souffrance.", imageSrc: ["/assets/temp/rip/Daisy-4.jpg", "/assets/temp/rip/Daisy-5.jpg", "/assets/temp/rip/Daisy-3.jpg", "/assets/temp/rip/Daisy-6.jpg"] },
            { id: "2", title: "Une nouvelle étoile 🌟", imageSrc: ["/assets/temp/adoption1.jpg"], description: "Luna est une boule d'amour..." },
            { id: "3", title: "L'operation de PAO", imageSrc:["/assets/temp/adoption2.jpg"], description: "Rocky est un jeune chat plein d'énergie..." },
            { id: "4", title: "Lorem ipsum dolor sit amet consectetur. Nisl adipiscing tristique congue vel.", description: "Bonjour, je m’appelle PAO. Je suis un chaton mâle âgé de 6 mois né dans la rue. J’ai été pris en charge par l’association et mis à l’abri avec ma Fratrie, nous étions petits. Je suis devenu un chaton merveilleux et affectueux.  Lors de ma stérilisation, le vétérinaire s’est aperçu à mon réveil que j’avais du mal à respirer. Il ‘a fait une échographie du thorax et là ……surprise, très mauvaise surprise …. J’ai une hernie diaphragmatique. Une malformation de naissance …. Pas de chance. Cela fatigue mon petit cœur rempli d’amour. Je dois être opéré au plus vite, l’association a organisé ma prise en charge auprès d’un vétérinaire-chirurgien très compétent.  Je suis confiant mais j’ai un peu peur … très peur…. Tatie m’a expliqué l’intervention et me réconforte avec les bénévoles. Je lance un appel, pourriez-vous aider l’association à financer mon opération (969€).  Un reçu fiscal vous sera délivrer et vous m’aurez sauvé.  Signé PAO qui vous remercie pour votre grand cœur et votre générosité.", imageSrc: ["/assets/temp/adoption1.jpg"] },
            { id: "5", title: "Luna 2", imageSrc: "/assets/temp/adoption1.jpg", description: "Luna est une boule d'amour..." },
        ]
    }

    // NOUVELLE fonction qui simule une récupération (asynchrone)
    function fetchNewsData() {
        console.log("Récupération des actions archivées...");
        return new Promise((resolve, reject) => {
            // Simule un délai réseau (ex: 300ms) pour imiter un appel serveur
            setTimeout(() => {
                try {
                    const data = pageNouvelles === null ? getAllRipData() : getAllNewsData(); // Pour l'instant, on prend nos données locales
                    console.log(`Données récupérées (simulation) : ${data.length} éléments.`);
                    resolve(data); // La Promise réussit et renvoie les données
                } catch (error) {
                    console.error("Erreur lors de la récupération simulée des données :", error);
                    reject("Impossible de charger les données des archives."); // La Promise échoue
                }
            }, 300); // Simule 300ms de délai

            /*
            // ===> PLUS TARD, TU REMPLACERAS LE setTimeout PAR CECI <===
            fetch('/chemin/vers/ton/api/qui/lit/excel') // Adapte l'URL
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    }
                    return response.json(); // Convertit la réponse en JSON
                })
                .then(data => {
                    console.log(`Données récupérées depuis l'API : ${data.length} éléments.`);
                    resolve(data);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération via API:", error);
                    reject("Impossible de charger les données des adoptions depuis le serveur.");
                });
            */
        });
    }

     // --- Définitions des fonctions (suite) ---

    // --- Logique de récupération des données pour la page ---
    function getNewsDataForPage(pageNumber) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allData.slice(startIndex, endIndex);
    }

    // --- Rendering ---
    function renderNewsCards(data) {
        nouvellesList.innerHTML = ""; // Efface le contenu précédent
    
        console.log(data)
        if (!data || data.length === 0) {
            const emptyImageSrc = "/assets/icones/icone-chat.png";
            const emptyMessageText = "Il n'y a aucun chat à afficher ici";

            const emptyMessageHTML = `
                <div class="empty-grid-message">
                    <img src="${emptyImageSrc}" alt="Aucun chat trouvé">
                    <p>${emptyMessageText}</p>
                    </div>
            `;
            nouvellesList.innerHTML = emptyMessageHTML;
            return;
        }

        data.forEach(news => {
            const card = document.createElement("div");
            card.classList.add("item-news");
            if (Number(news.id) % 2 == 0) {
                card.classList.add("paire");
            }
            card.dataset.newsId = news.id;
            card.setAttribute('role', 'article');
    
            const photos = news.imageSrc || []; // Assure que photos est un tableau, même si imageSrc est null/undefined
    
            let galleryHTML = ''; // Initialiser le HTML pour la galerie
    
            // --- Création du HTML pour le carrousel si des photos existent ---
            // Le carrousel affichera MAINTENANT TOUTES les photos s'il y en a plus d'une
            if (photos.length > 0) { // On crée le conteneur de galerie s'il y a au moins une photo
                galleryHTML = `
                    <div class="item-news-gallery">
                        <div class="gallery-carousel-container">
                            <div class="gallery-carousel-track">
                                ${photos.map(src => `<div class="gallery-carousel-photo"><img src="../${src}" alt="Photo de ${news.title || 'nouvelle'}"></div>`).join('')}
                            </div>
                            ${photos.length > 1 ? `
                            <div class="carousel-buttons-container">
                                <ul class="pagination">
                                    <button class="carousel-prev" id="prevButton" aria-label="Photo précédente de la galerie"><img src="/assets/icones/icon-arrow-2.svg" alt=""></button>
                                    <button class="carousel-next" id="nextButton" aria-label="Photo suivante de la galerie"><img src="/assets/icones/icon-arrow-2.svg" alt=""></button>
                                </ul>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            } else {
                 // Si aucune photo, on peut ajouter une image par défaut ou laisser vide
                 galleryHTML = `
                     <div class="item-news-gallery">
                         <img src="/assets/temp/default-cat.jpg" alt="Image par défaut">
                     </div>
                 `;
            }
    
    
            // --- Construction de la carte complète ---
            card.innerHTML = `
                        <div class="item-news-text">
                            <p class="section-title">${news.title || 'Titre non disponible'}</p>
                            <p class="text">${news.description || 'Description non disponible'}</p>
                        </div>
                        ${galleryHTML}
            `;
    
            nouvellesList.appendChild(card);
    
            // --- Initialisation du carrousel de la galerie SI nécessaire (plus d'une photo) ---
            if (photos.length > 1) {
                const galleryContainer = card.querySelector('.gallery-carousel-container');
                if (!galleryContainer) {
                     console.error("Conteneur de galerie introuvable pour la carte:", news.id);
                     return;
                }
    
                const track = galleryContainer.querySelector('.gallery-carousel-track');
                const prevButton = galleryContainer.querySelector('.carousel-prev');
                const nextButton = galleryContainer.querySelector('.carousel-next');
                const slides = Array.from(track.children); // Les divs .gallery-carousel-photo
    
                // S'assurer que les slides ont une largeur définie pour le calcul
                slides.forEach(slide => {
                    slide.style.width = '100%'; // Chaque slide prendra 100% de la largeur du conteneur
                    slide.style.flexShrink = 0; // Empêche le rétrécissement des slides
                });
    
    
                let imageWidth = galleryContainer.offsetWidth;
                if (imageWidth === 0) {
                     console.warn("Largeur du conteneur de galerie nulle lors de l'initialisation pour la carte:", news.id);
                     // Masquer les boutons si la largeur est nulle pour éviter des problèmes
                     if (prevButton) prevButton.style.display = 'none';
                     if (nextButton) nextButton.style.display = 'none';
                     return;
                }
    
                let counter = 0; // Compteur spécifique à CE carrousel de galerie
    
                track.style.transform = `translateX(0px)`; // Position initiale
                 track.style.display = 'flex'; // Utiliser flexbox pour aligner les slides horizontalement
                 track.style.transition = 'transform 0.5s ease-in-out'; // Ajouter une transition
    
                const updateCarouselButtons = () => {
                    if (!prevButton || !nextButton) return;
                    prevButton.disabled = counter === 0;
                    nextButton.disabled = counter === slides.length - 1;
                    prevButton.classList.toggle('disabled', counter === 0);
                    nextButton.classList.toggle('disabled', counter === slides.length - 1);
                };
    
                nextButton.addEventListener('click', () => {
                    if (counter >= slides.length - 1) return;
                    counter++;
                     imageWidth = galleryContainer.offsetWidth; // Recalculer la largeur au clic au cas où
                    track.style.transform = `translateX(-${imageWidth * counter}px)`;
                    updateCarouselButtons();
                });
    
                prevButton.addEventListener("click", () => {
                    if (counter <= 0) return;
                    counter--;
                     imageWidth = galleryContainer.offsetWidth; // Recalculer la largeur au clic au cas où
                    track.style.transform = `translateX(-${imageWidth * counter}px)`;
                    updateCarouselButtons();
                });
    
                updateCarouselButtons(); // État initial
    
                // Gestion du redimensionnement pour la galerie
                window.addEventListener('resize', () => {
                     // Vérifier si le conteneur est toujours dans le DOM et visible
                    if (!document.body.contains(galleryContainer) || galleryContainer.offsetParent === null) {
                        // Optionnel: supprimer l'écouteur d'événement si l'élément n'est plus là
                        // window.removeEventListener('resize', ...);
                        return;
                    }
    
                    imageWidth = galleryContainer.offsetWidth;
                    if (imageWidth > 0) {
                         track.style.transition = 'none'; // Désactiver la transition pendant le redimensionnement
                         track.style.transform = `translateX(-${imageWidth * counter}px)`;
                         // Réactiver la transition après un court délai pour permettre le repositionnement instantané
                         setTimeout(() => {
                             track.style.transition = 'transform 0.5s ease-in-out';
                         }, 50);
                     } else {
                          // Si la largeur devient nulle, masquer les boutons
                          if (prevButton) prevButton.style.display = 'none';
                          if (nextButton) nextButton.style.display = 'none';
                     }
                });
            }
            // Si une seule photo, on n'initialise pas le carrousel, et l'image unique est déjà dans .item-news-gallery
        });
    };

    // --- Button State Management (Pagination - utilise maintenant 'totalPages' recalculé) ---
    function updatePaginationButtonStates() {
        // Désactivé si en transition OU si page 1 / dernière page
        prevButton.disabled = isTransitioning || currentPage <= 1;
        nextButton.disabled = isTransitioning || currentPage >= totalPages;
         // console.log(`Update Pagination Buttons: Prev disabled=${prevButton.disabled}, Next disabled=${nextButton.disabled}`);
        if (totalPages < 2) { 
            paginationNav.classList.add('hidden')
        } else {
            paginationNav.classList.remove('hidden')
        }
    }

    // --- Page Update Logic  ---
    function updatePage(newPage) {
        // Vérification 1: Page valide ? (utilise 'totalPages' qui est basé sur le filtre)
       if (newPage < 1 || newPage > totalPages) {
           console.warn(`Action ignorée: Page ${newPage} est hors limites (1-${totalPages}).`);
           // Si on essaie d'aller hors limite, on s'assure que les boutons sont dans l'état correct final
            isTransitioning = false; // Assure que la transition est marquée comme finie
            updatePaginationButtonStates(); // Met à jour l'état final des boutons
           return;
       }
        // Vérification 2: Déjà en transition ?
       if (isTransitioning) {
           console.warn("Action ignorée: Transition déjà en cours.");
           return;
       }

       // --- Début de la Transition ---
       isTransitioning = true;
       currentPage = newPage;

       // Désactive les DEUX boutons de pagination PENDANT la transition
       prevButton.disabled = true;
       nextButton.disabled = true;
       console.log(`Transition page commencée vers page ${currentPage}. Boutons pagination désactivés.`);

       if (nouvellesList) {
        nouvellesList.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }

       setTimeout(() => {
           nouvellesList.classList.add('fade-out');
           nouvellesList.classList.remove('fade-in');

           setTimeout(() => {
               // !!! Utilise les données filtrées pour la page actuelle !!!
               const newData = getNewsDataForPage(currentPage);
               renderNewsCards(newData);

                nouvellesList.classList.remove('fade-out');
                nouvellesList.classList.add('fade-in');

               setTimeout(() => {
                   console.log(`Transition page terminée. Page finale: ${currentPage}.`);
                   isTransitioning = false; // Fin de la transition
                   // Met à jour l'état final des boutons de pagination
                   updatePaginationButtonStates();
                   console.log("Boutons pagination mis à jour.");
               }, animationDuration);

           }, animationDuration);

       });
   }

    // --- Event Listeners ---
    nextButton.addEventListener("click", () => {
        updatePage(currentPage + 1);
    });

    prevButton.addEventListener("click", () => {
        updatePage(currentPage - 1);
    });

    fetchNewsData()
        .then(fetchedData => {
            // *** Ce code s'exécute SEULEMENT APRES que fetchAdoptionData a résolu la Promise ***
            console.log("Données reçues, initialisation de l'interface.");

            // 1. Stocker les données et créer la Map pour accès rapide par ID
            const allNews = fetchedData; // Référence globale si nécessaire
            allDataMap = new Map(allNews.map(news => [news.id, news]));

            // 2. Attacher les listeners qui dépendent des données ou de l'état initial
            nextButton.addEventListener("click", () => { updatePage(currentPage + 1); });
            prevButton.addEventListener("click", () => { updatePage(currentPage - 1); });

            // 4. Afficher la première page
            const initialData = getNewsDataForPage(currentPage);
            renderNewsCards(initialData); // Affiche les cartes (avec leurs listeners internes)
            updatePaginationButtonStates();   // Mettre à jour l'état des boutons de pagination

            console.log("Application prête !");

        })
        .catch(error => {
            // *** Ce code s'exécute si fetchAdoptionData rejette la Promise ***
            console.error("Erreur critique lors du chargement des données:", error);
            // Afficher un message d'erreur clair à l'utilisateur
            nouvellesList.innerHTML = `<p style='color: red; text-align: center; padding: 40px;'>${error || "Impossible de charger les informations pour le moment. Veuillez réessayer."}</p>`;
            // Optionnel: Cacher les contrôles inutilisables
            if (paginationNav) paginationNav.classList.add('hidden');
        });

    console.log("Attente de la récupération des données..."); // Ce message s'affiche avant la fin du fetch

    // --- Initialisation ---
    console.log("Initialisation de l'application...");
    const initialData = getNewsDataForPage(currentPage); // Récupère la page 1 des données (déjà filtrées par 'all')
    totalPages = Math.ceil(allData.length / itemsPerPage);
    // Assurer qu'il y a au moins une page, même si vide
    if (totalPages < 1) {
        totalPages = 1;
    }
    renderNewsCards(initialData); // Affiche la première page
    updatePaginationButtonStates(); // Définit l'état initial des boutons de pagination
    console.log(`Initialisation terminée. Page: ${currentPage}, Total Pages: ${totalPages}`);
});
