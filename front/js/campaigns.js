
// Fonction pour afficher/masquer le formulaire
function toggleCreateCampaignForm() {
    var formSection = document.getElementById('create-campaign-form');
    formSection.style.display = (formSection.style.display === 'none') ? 'block' : 'none';
}
    // Masquer le formulaire après enregistrement
    toggleCreateCampaignForm();
    // Réinitialiser les champs du formulaire
    alert("Bien Envoyé")
    document.getElementById('campaignForm').reset();
/*

// Fonction pour sauvegarder la campagne
function saveCampaign() {
    // Récupérer les données du formulaire
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var start_date = document.getElementById('start_date').value;
    var end_date = document.getElementById('end_date').value;
    var budget = document.getElementById('budget').value;

    // TODO: Envoyer ces données vers le serveur ou effectuer l'écriture dans le fichier "/models/campaigns"
        
}
*/