// --- Données Mockup (Simulation de l'API / Base de données) ---
const messagesData = [
    { id: 1, name: "Jérémy", role: "Lycéen/Étudiant", pole: "DEV", humeur: "happy", comment: "Une journée portes ouvertes vraiment enrichissante ! J'ai été impressionné par la créativité des étudiants MMI et par la diversité des projets présentés. L'équipe pédagogique est accueillante et passionnée, et l'ambiance générale donne envie de rejoindre la formation. J'ai adoré les stands du pôle Dev ! Merci pour votre disponibilité et vos explications claires — cette visite confirme mon intérêt pour la parcours MMI !", note: 4 },
    { id: 2, name: "Anonyme", role: "Parent", pole: "STRAT", humeur: "happy", comment: "Très belle découverte lors de cette journée portes ouvertes ! En tant que parent, j'ai beaucoup apprécié la qualité de l'accueil et la clarté des explications. Les projets réalisés par les étudiants MMI sont impressionnants et montrent une réelle maîtrise des compétences enseignées. L’équipe pédagogique est rassurante, passionnée et disponible. Cette visite me confirme que mon enfant sera bien accompagné dans une formation stimulante et porteuse d'avenir. Merci à toute l'IUT de Toulon pour cette présentation de grande qualité !", note: 5 },
    { id: 3, name: "Francis", role: "Parent", pole: "CREA", humeur: "neutral", comment: "Très belle découverte lors de cette journée portes ouvertes ! En tant que parent, j'ai beaucoup apprécié la qualité de l'accueil et la clarté des explications. Les projets réalisés par les étudiants MMI sont impressionnants et montrent une réelle maîtrise des compétences enseignées. L’équipe pédagogique est rassurante, passionnée et disponible. Cette visite me confirme que mon enfant sera bien accompagné dans une formation stimulante et porteuse d'avenir. Merci à toute l'IUT de Toulon pour cette présentation de grande qualité !", note: 4 },
    { id: 4, name: "Anonyme", role: "Lycéen/Étudiant", pole: "CREA", humeur: "happy", comment: "Une journée portes ouvertes vraiment enrichissante ! J'ai été impressionné par la créativité des étudiants MMI et par la diversité des projets présentés. L'équipe pédagogique est accueillante et passionnée, et l'ambiance générale donne envie de rejoindre la formation. J'ai adoré les stands du pôle Dev ! Merci pour votre disponibilité et vos explications claires — cette visite confirme mon intérêt pour la parcours MMI !", note: 4 },
    // Ajout de messages pour simuler la pagination
    { id: 5, name: "Sophie", role: "Lycéen/Étudiant", pole: "STRAT", humeur: "neutral", comment: "J'ai trouvé la journée très intéressante, mais un peu trop de monde sur certains stands. Les explications étaient claires.", note: 3 },
    { id: 6, name: "Paul", role: "Parent", pole: "DEV", humeur: "happy", comment: "Excellente présentation du pôle Dev. Mon fils est motivé ! Le niveau des projets est très encourageant.", note: 5 },
    { id: 7, name: "Marine", role: "Lycéen/Étudiant", pole: "DEV", humeur: "happy", comment: "Super ambiance et des projets incroyables. J'ai hâte de postuler.", note: 5 },
    { id: 8, name: "Thomas", role: "Parent", pole: "CREA", humeur: "neutral", comment: "Bonne organisation générale. L'équipe pédagogique semble très compétente.", note: 4 },
    { id: 9, name: "Clara", role: "Lycéen/Étudiant", pole: "STRAT", humeur: "happy", comment: "Les projets Stratégie étaient vraiment pertinents et bien expliqués.", note: 4 },
    { id: 10, name: "Marc", role: "Parent", pole: "DEV", humeur: "happy", comment: "Rien à redire, tout était parfait. Félicitations pour cette journée !", note: 5 },
    { id: 11, name: "Julien", role: "Lycéen/Étudiant", pole: "CREA", humeur: "happy", comment: "Coup de cœur pour les travaux du pôle Création. Très inspirant.", note: 4 },
    { id: 12, name: "Emma", role: "Parent", pole: "STRAT", humeur: "happy", comment: "Une visite très complète qui a répondu à toutes mes questions.", note: 5 },
    { id: 13, name: "Alice", role: "Lycéen/Étudiant", pole: "DEV", humeur: "neutral", comment: "Journée informative, les stands Dev étaient bien fournis.", note: 3 },
    { id: 14, name: "David", role: "Parent", pole: "CREA", humeur: "happy", comment: "Impressionné par la créativité. Formation de qualité.", note: 5 },
];

// État de l'interface
let currentPage = 0; // Correspond au 'get' : 0 = affichage des 6 derniers, 1 = 6 messages précédents, etc.
let currentFilter = {
    role: "Tous", // 'Tous', 'Lycéen/Étudiant', 'Parent'
    humeur: "Tous", // 'Tous', 'happy', 'neutral'
    pole: "Tous", // 'Tous', 'DEV', 'STRAT', 'CREA'
    note: 0 // 0 (pas de filtre) à 5
};
const MESSAGES_PER_PAGE = 6;

// --- Fonctions Utilitaires ---

/**
 * Génère le code HTML des étoiles pour une note donnée.
 * @param {number} note - La note (de 1 à 5).
 * @returns {string} HTML des étoiles.
 */
function renderStars(note) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= note ? 'fas' : 'far'; // fas = remplie, far = vide (Font Awesome)
        starsHtml += `<i class="${starClass} fa-star"></i>`;
    }
    return `<div class="rating">${starsHtml}</div>`;
}

/**
 * Convertit la valeur humeur stockée en emoji pour l'affichage.
 * @param {string} humeur - La valeur de l'humeur ('happy', 'neutral').
 * @returns {string} L'emoji correspondant.
 */
function getHumeurEmoji(humeur) {
    switch (humeur) {
        case 'happy':
            return '😊';
        case 'neutral':
            return '😐';
        default:
            return '';
    }
}

/**
 * Génère le code HTML pour un seul message.
 * @param {object} message - L'objet message.
 * @returns {string} Le code HTML du message.
 */
function createMessageCard(message) {
    return `
        <article class="message-card">
            <h3>${message.name} ~ ${message.role} ${getHumeurEmoji(message.humeur)}</h3>
            ${renderStars(message.note)}
            <p class="comment">${message.comment}</p>
        </article>
    `;
}

// --- Logique d'Affichage et de Filtrage ---

/**
 * Filtre les messages en fonction des critères de l'état global.
 * @returns {Array} La liste des messages filtrés.
 */
function getFilteredMessages() {
    return messagesData.filter(msg => {
        // Filtre par Rôle
        const roleMatch = currentFilter.role === 'Tous' || currentFilter.role === 'role' || msg.role === currentFilter.role;

        // Filtre par Pôle
        const poleMatch = currentFilter.pole === 'Tous' || msg.pole === currentFilter.pole;

        // Filtre par Humeur
        const humeurMatch = currentFilter.humeur === 'Tous' || msg.humeur === currentFilter.humeur;

        // Filtre par Note (>= note sélectionnée)
        const noteMatch = currentFilter.note === 0 || msg.note >= currentFilter.note;

        return roleMatch && poleMatch && humeurMatch && noteMatch;
    });
}

/**
 * Met à jour l'affichage des messages dans le DOM.
 */
function renderMessages() {
    const container = document.querySelector('.message-container');
    const filteredList = getFilteredMessages();
    
    // Déterminer les indices de début et de fin pour la pagination
    // La position 0 est la fin (les plus récents)
    const startIndex = Math.max(0, filteredList.length - (currentPage + 1) * MESSAGES_PER_PAGE);
    const endIndex = filteredList.length - currentPage * MESSAGES_PER_PAGE;
    
    // Extrait la tranche de 6 messages (du plus récent au plus ancien)
    const messagesToDisplay = filteredList.slice(startIndex, endIndex).reverse();

    if (messagesToDisplay.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / span 2; text-align: center;">Aucun message trouvé pour ces critères de filtre.</p>';
    } else {
        container.innerHTML = messagesToDisplay.map(createMessageCard).join('');
    }

    updatePaginationControls(filteredList.length);
}

/**
 * Met à jour l'état des flèches de pagination (activé/désactivé).
 * @param {number} totalMessages - Le nombre total de messages filtrés.
 */
function updatePaginationControls(totalMessages) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // 'Reculer d'une page' (flèche gauche) : get + 1
    // Disabled si on est sur la dernière "page" (le début de la liste)
    prevButton.disabled = (currentPage + 1) * MESSAGES_PER_PAGE >= totalMessages;

    // 'Avancer d'une page' (flèche droite) : get - 1
    // Disabled si on est sur la page des messages les plus récents (currentPage = 0)
    nextButton.disabled = currentPage === 0;
}


// --- Gestion des Événements ---

/**
 * Gère l'application d'un filtre et réinitialise la pagination.
 * @param {string} type - Le type de filtre ('role', 'humeur', 'pole', 'note').
 * @param {string|number} value - La valeur du filtre.
 */
function applyFilter(type, value) {
    // Si on reclique sur le filtre actif pour un type donné (sauf 'Tous' et 'note'), on le désactive.
    if (currentFilter[type] === value && value !== 'Tous' && type !== 'note') {
        currentFilter[type] = (type === 'role' || type === 'humeur') ? 'Tous' : 0; // Réinitialiser le filtre
        // Pour les rôles/humeurs, on s'assure que le bouton 'Commenter' est actif
        if (type === 'role' || type === 'humeur') {
             document.querySelectorAll('.role-humeur-filters .filter-btn').forEach(btn => {
                if (btn.dataset.filterValue === 'Tous') {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    } else {
        // Appliquer la nouvelle valeur
        currentFilter[type] = value;
    }

    // Réinitialiser la pagination après chaque filtre
    currentPage = 0;

    // Mise à jour de l'état 'active' des boutons de rôle/humeur/pôle (sauf les étoiles)
    if (type !== 'note') {
        // Désactiver tous les boutons du même groupe
        document.querySelectorAll(`[data-filter-type="${type}"]`).forEach(btn => btn.classList.remove('active'));

        // Activer le bouton cliqué, sauf si le filtre a été désactivé
        if (currentFilter[type] === value) {
            document.querySelector(`[data-filter-type="${type}"][data-filter-value="${value}"]`)?.classList.add('active');
        } else {
            // Activer le bouton 'Commenter' si on désactive un filtre rôle/humeur
            if (type === 'role' || type === 'humeur') {
                 document.querySelector(`[data-filter-type="role"][data-filter-value="Tous"]`).classList.add('active');
            }
        }
    }

    // Mise à jour de l'interface
    renderMessages();
}

/**
 * Gère le changement de page.
 * @param {number} direction - 1 pour reculer (get + 1), -1 pour avancer (get - 1).
 */
function changePage(direction) {
    const filteredCount = getFilteredMessages().length;
    const maxPage = Math.ceil(filteredCount / MESSAGES_PER_PAGE) - 1;

    if (direction === 1 && (currentPage + 1) * MESSAGES_PER_PAGE < filteredCount) {
        // Reculer (Flèche Gauche) : get + 1
        currentPage++;
    } else if (direction === -1 && currentPage > 0) {
        // Avancer (Flèche Droite) : get - 1
        currentPage--;
    }

    renderMessages();
}

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialiser l'affichage par défaut (les 6 derniers)
    renderMessages();

    // 2. Écouteurs d'événements pour les filtres Rôle/Humeur
    document.querySelectorAll('.filter-group.role-humeur-filters .filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.filterType;
            let value = e.currentTarget.dataset.filterValue;

            // Logique spéciale pour le bouton "Rôle" qui ouvre les sous-options
            if (value === 'role') {
                // Remplacer par une liste/modal si c'était une vraie app. Ici, on simule en alternant Parent/Lycéen
                if (currentFilter.role === 'Parent') {
                    value = 'Lycéen/Étudiant';
                } else {
                    value = 'Parent';
                }
                // Mettre à jour le texte du bouton pour simuler la sélection
                e.currentTarget.textContent = value;
            } else if (value === 'Tous') {
                 // Gérer le bouton 'Commenter' qui réinitialise
                 currentFilter.role = 'Tous';
                 currentFilter.humeur = 'Tous';
                 document.querySelector(`[data-filter-value="role"]`).textContent = 'Rôle'; // Réinitialiser le texte du bouton Rôle
            }

            applyFilter(type, value);
        });
    });

    // 3. Écouteurs d'événements pour les filtres Pôles (Barres latérales)
    document.querySelectorAll('.pole-bar').forEach(poleBar => {
        poleBar.addEventListener('click', (e) => {
             const value = e.currentTarget.dataset.filterValue;
             // Pour les pôles, on toggle le filtre (appliquer si inactif, désactiver si actif)
             applyFilter('pole', currentFilter.pole === value ? 'Tous' : value);
        });
    });

    // 4. Écouteurs d'événements pour les filtres Note (Étoiles)
    document.querySelectorAll('#star-filter .fas').forEach(star => {
        star.addEventListener('click', (e) => {
            const note = parseInt(e.currentTarget.dataset.note, 10);
            
            // Toggle : si la note est déjà sélectionnée, on désactive le filtre (note = 0)
            const newNote = currentFilter.note === note ? 0 : note;
            
            // Mettre à jour la classe 'selected' des étoiles
            document.querySelectorAll('#star-filter .fas').forEach(s => {
                const starNote = parseInt(s.dataset.note, 10);
                // Si la note est nouvelle, on sélectionne celles >= à la nouvelle note
                if (newNote > 0) {
                    s.classList.toggle('selected', starNote >= newNote);
                } else {
                    // Si on désactive (newNote = 0), on enlève tout
                    s.classList.remove('selected');
                }
            });

            applyFilter('note', newNote);
        });
    });
    
    // 5. Écouteurs d'événements pour la Pagination
    document.getElementById('prev-page').addEventListener('click', () => changePage(1)); // get + 1
    document.getElementById('next-page').addEventListener('click', () => changePage(-1)); // get - 1
});