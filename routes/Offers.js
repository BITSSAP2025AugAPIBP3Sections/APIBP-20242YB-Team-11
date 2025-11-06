const express = require("express");
const router = express.Router();
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  getMyOffers,
  getOffersByFilter,
  searchOffers,
} = require("../controllers/Offers");