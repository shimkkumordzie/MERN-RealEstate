import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "API route is working!....",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorhandler(403, "You can only update details of your own account")
    );

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...restInfo } = updatedUser._doc;
    res.status(200).json(restInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(
      errorhandler(403, "You only allowed to delete your own account")
    );

  try {
    await User.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .clearCookie("access_token")
      .json("User successfully deleted");
  } catch (error) {
    next(error);
  }
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
