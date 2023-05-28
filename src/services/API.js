import { Notify } from "notiflix";
import axios from "axios";

const baseUrl = "https://superheroes-api-evnc.onrender.com";

// http://localhost:8080/heroes

export const getAllHero = async (page) => {
  try {
    const { data } = await axios.get(`${baseUrl}?page=${page}`);
    return data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const getHeroById = async (id) => {
  try {
    const { data } = await axios.get(`http://localhost:8080/heroes/${id}`);
    return data.result;
  } catch (err) {
    Notify.failure(err.message);
  }
};

export const addHeroPhoto = async (file) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/heroes/photo",
      file,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.result;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const createHeroInfo = async (body) => {
  try {
    const { data } = await axios.post("http://localhost:8080/heroes", body);
    Notify.success("Hero was created");
    return data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const updateHeroById = async (body, id) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:8080/heroes/${id}`,
      body
    );
    Notify.success("Hero was updated");
    return data;
  } catch (error) {
    Notify.failure(error.message);
  }
};

export const deleteHero = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/heroes/${id}`);
    Notify.success("Hero was deleted");
  } catch (err) {
    Notify.failure(err.message);
  }
};
