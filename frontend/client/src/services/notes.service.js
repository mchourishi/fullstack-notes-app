import api from "../utils/axios";

export const createNote = async (noteData) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get("/notes");
  return Array.isArray(response.data) ? response.data : [];
};

export const getRandomQuote = async () => {
  const response = await api.get("/notes/random_quote");
  return response.data;
};
