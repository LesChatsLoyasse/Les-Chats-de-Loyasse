function observerElements() {
    let header = document.getElementById("header");

    let options = {
        root: null,  // Prend le viewport comme référence
        rootMargin: "0px",
        threshold: 0.4 // L’élément doit être visible à 20% pour être détecté
    };

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // Ajoute la classe "visible"
                observer.unobserve(entry.target); // Arrête d'observer une fois visible
            }
        });
    }, options);

    document.querySelectorAll(".checkVisibility").forEach(checkVisibility => {
        observer.observe(checkVisibility); // Observe chaque élément avec la classe "checkVisibility"
    });

    if (window.matchMedia("(max-width : 767px)").matches) {
        header.innerHTML = `
            <div id="mySidenav" class="sidenav">
                <a id="closeBtn" href="#" class="close">×</a>
                <ul>
                 <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/index.html#">Accueil</a></li>
                <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/adopter.html#">Adopter</a></li>
                <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/qui-sommes-nous.html#">Qui sommes nous ?</a></li>
                <li class="dropdown-burger" id="dropdown"><a href="#">Nos chats<img src="file:///Users/dorivne/Les-Chats-de-la-Loyasse/static/icones/arrow.png"></a>
                    <ul class="dropdown-menu-burger hidden" id="dropdown-menu">
                        <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nos-chats/nouvelles-chats.html">Des nouvelles de nos chats</a></li>
                        <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nos-chats/chats-partis.html#">Ils nous ont quittés</a></li>
                    </ul>
                </li>
                <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nous-aider.html#">Nous aider</a></li>
                <li class="dropdown-burger" id="dropdown-2"><a href="#">Nos actions<img src="file:///Users/dorivne/Les-Chats-de-la-Loyasse/static/icones/arrow.png"></a>
                    <ul class="dropdown-menu-burger hidden" id="dropdown-menu-2">
                        <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nos-actions/actualites.html#">Nos actions récentes</a></li>
                        <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nos-actions/archives.html#">Archives</a></li>
                        <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/nos-actions/gazette.html#">Gazette</a></li>
                    </ul>
                </li>
                <li><a href="file:///Users/dorivne/Les-Chats-de-la-Loyasse/contact.html#">Contacts</a></li>
                </ul>
            </div>
          
            <a href="#" id="openBtn">
                <span class="burger-icon">
                <span></span>
                <span></span>
                <span></span>
                </span>
            </a>
            
            <div class="logo"> <img src="file:///Users/dorivne/Les-Chats-de-la-Loyasse/static/logo/logo.png" alt="Logo Association"> </div>`

        var sidenav = document.getElementById("mySidenav");
        var openBtn = document.getElementById("openBtn");
        var closeBtn = document.getElementById("closeBtn");
        var dropdown = document.getElementById("dropdown");
        var dropdown2 = document.getElementById("dropdown-2");
        var dropdownMenu = document.getElementById("dropdown-menu");
        var dropdownMenu2 = document.getElementById("dropdown-menu-2");

        openBtn.onclick = openNav;
        closeBtn.onclick = closeNav;

        /* Set the width of the side navigation to 250px */
        function openNav() {
        sidenav.classList.add("active");
        }

        /* Set the width of the side navigation to 0 */
        function closeNav() {
        sidenav.classList.remove("active"); 
        }

        if (dropdown && dropdown2) {
            dropdown.addEventListener("click", function (evt) {
                toggleDisplay(evt);
            })

            dropdown2.addEventListener("click", function (evt) {
                    toggleDisplay2(evt);
            });
        }
        
        function toggleDisplay(evt){
            dropdownMenu.classList.toggle("hidden"); 
        }

        function toggleDisplay2(evt){
            dropdownMenu2.classList.toggle("hidden"); 
        }

    }
}

// Exécuter la fonction au chargement de la page
document.addEventListener("DOMContentLoaded", observerElements);