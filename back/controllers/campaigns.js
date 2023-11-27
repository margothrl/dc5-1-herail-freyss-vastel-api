const uuid = require('uuid/v1');
const campaigns = require('../models/campaigns');

exports.getAllCampaigns = (req, res, next) => {
  campaigns.find().then(
    (campaigns) => {
      const mappedCampaigns = campaigns.map((campaigns) => {
        campaigns.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaigns.imageUrl;
        return campaigns;
      });
      res.status(200).json(mappedCampaigns);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
};
exports.getOnecampaigns = (req, res, next) => {
  campaigns.findById(req.params.id).then(
    (campaigns) => {
      if (!campaigns) {
        return res.status(404).send(new Error('campaigns not found!'));
      }
      campaigns.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaigns.imageUrl;
      res.status(200).json(campaigns);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * campaigns: [string] <-- array of campaigns _id
 *
 */
exports.ordercampaigns = (req, res, next) => {
  if (!req.body.contact ||
      !req.body.contact.firstName ||
      !req.body.contact.lastName ||
      !req.body.contact.address ||
      !req.body.contact.city ||
      !req.body.contact.email ||
      !req.body.campaigns) {
    return res.status(400).send(new Error('Bad request!'));
  }
  let queries = [];
  for (let campaignsId of req.body.campaigns) {
    const queryPromise = new Promise((resolve, reject) => {
      campaigns.findById(campaignsId).then(
        (campaigns) => {
          if (!campaigns) {
            reject('campaigns not found: ' + campaignsId);
          }
          campaigns.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaigns.imageUrl;
          resolve(campaigns);
        }
      ).catch(
        () => {
          reject('Database error!');
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (campaigns) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        campaigns: campaigns,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(new Error(error));
    }
  );
};
