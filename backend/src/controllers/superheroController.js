import {
  listSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  removeSuperhero,
} from '../services/superheroService.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';
import * as fs from 'node:fs/promises';
import { normalizeSuperpowers } from '../utils/normalizeSuperpowers.js';



export const getSuperheroes = async (req, res) => {
  const { search, sort, page } = req.query;

  const superheroes = await listSuperheroes({ search, sort, page });

  res.status(200).json({ status: 200, data: superheroes });
};


export const postSuperhero = async (req, res) => {
  let images = [];

  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path);
      await fs.unlink(file.path);

     if (!result || !result.secure_url || !result.public_id) {
      return res.status(500).json({
        message: 'Image upload to Cloudinary failed',
      });
    }
      images.push({
        url: result.secure_url,
        public_id: result.public_id,
        uploadedAt: new Date(),
      });
    }
  }

  normalizeSuperpowers(req);

  const superheroData = {
    ...req.body,
    images,
  };

  const superhero = await createSuperhero(superheroData);
  res.status(201).json({ status: 201, data: superhero });
};


export const patchSuperhero = async (req, res) => {
  const { id } = req.params;

  normalizeSuperpowers(req);

  const newImages = [];
  if (req.files?.length > 0) {
    for (const file of req.files) {
      const result = await uploadToCloudinary(file.path);
      await fs.unlink(file.path);
      if (!result?.secure_url || !result?.public_id) {
        return res.status(500).json({ message: 'Image upload to Cloudinary failed' });
      }
      newImages.push({
        url: result.secure_url,
        public_id: result.public_id,
        uploadedAt: new Date(),
      });
    }
  }

  const superhero = await getSuperheroById(id); 

  let updatedImages = [...superhero.images];

  if (req.body.imagesToDelete) {
    let toDelete = [];
    try {
      toDelete = JSON.parse(req.body.imagesToDelete);
    } catch (e) {
      return res.status(400).json({ message: "Invalid imagesToDelete format" });
    }

    updatedImages = updatedImages.filter(img => !toDelete.includes(img.public_id));

    for (const publicId of toDelete) {
      await deleteFromCloudinary(publicId);
    }
  }

  const updatedData = {
    ...req.body,
    images: [...updatedImages, ...newImages],
  };

  const updatedSuperhero = await updateSuperhero(id, updatedData);
  res.status(200).json({ status: 200, data: updatedSuperhero });
};



export const deleteSuperhero = async (req, res) => {
  const { id } = req.params;

  const superhero = await getSuperheroById(id);
  if (!superhero) {
    return res.status(404).json({ message: 'Superhero not found' });
  }

  for (const image of superhero.images) {
    if (image.public_id) {
      try {
        await deleteFromCloudinary(image.public_id);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
      }
    }
  }

  await removeSuperhero(id);

  return res.status(204).send();
};


export const getSuperheroByIdController = async (req, res) => {
  const { id } = req.params;
  const superhero = await getSuperheroById(id);
  res.status(200).json({ status: 200, data: superhero });
};