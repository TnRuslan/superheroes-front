import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addHeroPhoto } from "../services/API";
import { Button, TextField } from "@mui/material";
import styled from "styled-components";

const StyledForm = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
`;

const initialValues = {
  nikname: "",
  name: "",
  origin: "",
  superPowers: "",
  catchPhrase: "",
  image: "",
};

export const Form = ({ hero, postFnc }) => {
  const [preview, setPreview] = useState(null);

  const onSubmitFnc = async (e) => {
    const { nikname, name, origin, superPowers, catchPhrase, image } = e;

    const formData = new FormData();
    formData.append("image", image);

    const photoUrl = await addHeroPhoto(formData);

    const body = {
      nikname,
      name,
      origin,
      superPowers,
      catchPhrase,
      images: photoUrl,
    };

    if (hero) {
      await postFnc(body, hero._id);
      formik.resetForm();
      return;
    }
    await postFnc(body);

    formik.resetForm();
    setPreview(null);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onSubmitFnc,
    validationSchema: Yup.object({
      nikname: Yup.string(),
      name: Yup.string(),
      origin: Yup.string(),
      image: Yup.mixed(),
    }),
  });

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      <label htmlFor="nikname">
        <TextField
          id="nikname"
          type="text"
          placeholder="nikname"
          onChange={formik.handleChange}
          value={formik.values.nikname}
          sx={{ width: "300px" }}
        />
      </label>
      <label htmlFor="name">
        <TextField
          id="name"
          type="text"
          placeholder="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          sx={{ width: "300px" }}
        />
      </label>
      <label htmlFor="origin">
        <TextField
          id="origin"
          type="text"
          placeholder="origin"
          onChange={formik.handleChange}
          value={formik.values.origin}
          sx={{ width: "300px" }}
        />
      </label>
      <label htmlFor="superPowers">
        <TextField
          id="superPowers"
          type="text"
          placeholder="Super Powers"
          onChange={formik.handleChange}
          value={formik.values.superPowers}
          sx={{ width: "300px" }}
        />
      </label>
      <label htmlFor="catchPhrase">
        <TextField
          id="catchPhrase"
          type="textarea"
          placeholder="Catch Phrase"
          onChange={formik.handleChange}
          value={formik.values.catchPhrase}
          sx={{ width: "300px" }}
        />
      </label>
      <label htmlFor="image">
        {preview && <img src={preview} alt="preview" width={200} />}
        <input
          id="image"
          type="file"
          multiple
          onChange={(e) => {
            setPreview(URL.createObjectURL(e.target.files[0]));
            formik.setFieldValue("image", e.target.files[0]);
          }}
        />
      </label>
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </StyledForm>
  );
};
