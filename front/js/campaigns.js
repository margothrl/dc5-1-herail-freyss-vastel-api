// Fonction pour afficher/masquer le formulaire
function toggleCreateCampaignForm() {
    var formSection = document.getElementById('create-campaign-form');
    formSection.style.display = (formSection.style.display === 'none') ? 'block' : 'none';
}

// Fonction pour sauvegarder la campagne
function saveCampaign() {
    // Récupérer les données du formulaire
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var start_date = document.getElementById('start_date').value;
    var end_date = document.getElementById('end_date').value;
    var budget = document.getElementById('budget').value;

    // Générer un ID unique
    var campaignId = generateUniqueId();

    // TODO: Envoyer ces données vers le serveur avec l'ID généré

     // Afficher le message de confirmation
     document.getElementById('confirmation-message').style.display = 'block';

     // Masquer le formulaire après enregistrement
     toggleCreateCampaignForm();
 
     // Réinitialiser les champs du formulaire
     document.getElementById('campaignForm').reset();
 
     // Masquer le message de confirmation après quelques secondes (par exemple, 3 secondes)
     setTimeout(function () {
         document.getElementById('confirmation-message').style.display = 'none';
     }, 3000); 
}

// Fonction pour générer un ID unique
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}



function afficherToutes() {
    // Afficher la section pour toutes les campagnes
    document.getElementById('voirToutesSection').style.display = 'block';

    // TODO: Ajouter le code pour récupérer et afficher toutes les campagnes depuis le serveur
}

// campaigns.js (côté client)

function afficherToutesCampagnes() {
    // Utilisez ici une méthode appropriée pour faire une requête au serveur
    // par exemple, via AJAX, pour récupérer toutes les campagnes.
    
    // Une approche simple pourrait être l'utilisation de la méthode fetch :
    fetch('/campaigns')
        .then(response => response.json())
        .then(data => {
            // Traitez les données récupérées (affichage, etc.)
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
