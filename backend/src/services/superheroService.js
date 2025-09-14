import createHttpError from "http-errors";
import Superhero from "../db/models/Superhero.js";
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const listSuperheroes = async ({ search, sort, page = 1, perPage = 5 }) => {
  const filter = {};

  if (search) {
    filter.$or = [
      { nickname: new RegExp(search, 'i') },
      { real_name: new RegExp(search, 'i') },
      { origin_description: new RegExp(search, 'i') },
      { superpowers: new RegExp(search, 'i') },
      { catch_phrase: new RegExp(search, 'i') },
    ];
  }

  let query = Superhero.find(filter);

  if (sort === 'nickname_asc') {
    query = query.sort({ nickname: 1 });
  } else if (sort === 'nickname_desc') {
    query = query.sort({ nickname: -1 });
  } else if (sort === 'created_asc') {
    query = query.sort({ createdAt: 1 });
  } else if (sort === 'created_desc') {
    query = query.sort({ createdAt: -1 });
  }

  const count = await Superhero.countDocuments(filter);

  const skip = (page - 1) * perPage;
  const items = await query.skip(skip).limit(perPage).exec();

  const pagination = calculatePaginationData(count, perPage, page);

  return {
    items,
    ...pagination,
  };
};


export const createSuperhero = async (data) => {

  const superhero = new Superhero(data);
  try {
    return await superhero.save();
  } catch (err) {
    throw createHttpError(400, "Failed to create superhero", { cause: err });
  }
};


export const updateSuperhero = async (id, updateData) => {
  const updatedSuperhero = await Superhero.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedSuperhero) {
    throw createHttpError(404, "Superhero not found");
  }

  return updatedSuperhero;
};

export const removeSuperhero = async (id) => {
  const superhero = await Superhero.findById(id);
  if (!superhero) {
    throw createHttpError(404, "Superhero not found");
  }

  await superhero.deleteOne();
};

export const getSuperheroById = async (id) => {
  const superhero = await Superhero.findById(id);

  if (!superhero) {
    throw createHttpError(404, "Superhero not found");
  }

  return superhero;
};