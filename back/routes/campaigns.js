const express = require('express');
const router = express.Router();

const campaignsCtrl = require('../controllers/campaigns');

// Acquérir toutes les campagnes
router.get('/', campaignsCtrl.getAllCampaigns)
// Acquérir une campagne par ID
router.get('/:id', campaignsCtrl.getOnecampaigns)
//Acquérir créer une campagne
router.post('/order', campaignsCtrl.ordercampaigns)
//Supprimer une campagne
//router.delete('/api/campaings/{id}', campaignsCtrl.DelCampaigns)
module.exports = router;