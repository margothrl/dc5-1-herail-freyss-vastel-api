const express = require('express');
const router = express.Router();

const campaignsCtrl = require('../controllers/product');

router.get('/api/campaings', campaignsCtrl.getAllCampaigns)
router.get('/api/campaings', campaignsCtrl.getAllCampaigns)
router.post('/api/campaings', campaignsCtrl.getAllCampaigns)
router.delete('/api/campaings', campaignsCtrl.getAllCampaigns)
module.exports = router;