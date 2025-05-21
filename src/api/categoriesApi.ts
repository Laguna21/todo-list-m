import { Category } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${BASE_URL}/categories`, { method: 'GET' });
    const data = await res.json();
    return data;
  } catch (err) {
    //console.error(err);
    throw new Error('Error with api');
  }
};
