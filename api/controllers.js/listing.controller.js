import Listing from "../models/listing.model.js";
import { errorhandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const listing = await User.findById(req.params.id);

  if (!listing) return next(errorhandler(401, "Listing does not exist!"));

  if (req.user.id !== listing.userRef)
    return next(401, "You can only delete your own listing!");

  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json("User listing has successfully been deleted!");
  } catch (error) {
    next(error);
  }
  res.status(200).json("User delete successfully");
};

export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      next(error);
    }
  } catch (error) {
    next(errorhandler(403, "You can only view your own listings"));
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log(listing);

  if (!listing) return next(errorhandler(401, "Listing does not exist!"));

  if (req.user.id !== listing.userRef)
    return next(401, "You can only delete your own listing!");

  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json("User listing has successfully been deleted!");
  } catch (error) {
    next(error);
  }
};
