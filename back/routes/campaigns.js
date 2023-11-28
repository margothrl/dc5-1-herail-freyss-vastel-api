const express = require('express');
const router = express.Router();

const campaignsCtrl = require('../controllers/campaigns');

// Acquérir toutes les campagnes
router.get('/api/campaings', campaignsCtrl.getAllCampaigns)
// Acquérir une campagne par ID
router.get('/api/campaings/{id}', campaignsCtrl.getOnecampaigns)
//Acquérir créer une campagne
router.post('/api/campaings', campaignsCtrl.ordercampaigns)
//Supprimer une campagne
//router.delete('/api/campaings/{id}', campaignsCtrl.DelCampaigns)
module.exports = router;