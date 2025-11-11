import TryCatch from "../utils/TryCatch.js";
import { Cards } from "../models/cards.js";
import getDataUrl from "../utils/urlgenerate.js";
import cloudinary from 'cloudinary';

// create Card
export const CreateCard = TryCatch(async (req, res) => {
  const { title, description, anime, power } = req.body;

  if (!title || !description || !anime || !power) {
    return res.status(400).json({ msg: "All Fields Are Required!!" });
  }

  if (!req.file) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const fileUrl = getDataUrl(req.file);
  const cloud = await cloudinary.v2.uploader.upload(fileUrl);

  await Cards.create({
    title,
    description,
    anime,
    power,
    thumbnail: {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    msg: "Card Created Successfully",
  });
});


// get Cards
export const getCards = TryCatch(async (req, res) => {
  const card = await Cards.find();
  res.json(card);
});


// update cards
export const updateCard = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { title, description, anime, power } = req.body;

  const card = await Cards.findById(id);
  if (!card) return res.status(404).json({ msg: "Card not found" });

  // Handle thumbnail update
  if (req.file) {
    // Delete old image from Cloudinary only if public_id exists
    if (card.thumbnail && card.thumbnail.public_id) {
      await cloudinary.v2.uploader.destroy(card.thumbnail.public_id);
    }

    // Upload new image
    const fileUrl = getDataUrl(req.file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl);

    card.thumbnail = {
      public_id: cloud.public_id,
      url: cloud.secure_url,
    };
  }

  // Update fields if provided
  if (title) card.title = title;
  if (description) card.description = description;
  if (anime) card.anime = anime;
  if (power) card.power = power;

  await card.save();

  res.status(200).json({
    success: true,
    msg: "Card Updated Successfully",
    card,
  });
});


// delete
export const deleteCard = TryCatch(async (req, res) => {
  const { id } = req.params;

  const card = await Cards.findById(id);
  if (!card) return res.status(404).json({ msg: "Card not found" });

  // Delete image from Cloudinary only if public_id exists
  if (card.thumbnail && card.thumbnail.public_id) {
    await cloudinary.v2.uploader.destroy(card.thumbnail.public_id);
  }

  await card.deleteOne();

  res.status(200).json({
    success: true,
    msg: "Card Deleted Successfully",
  });
});