import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { getHeroById, addHeroPhoto, createHeroInfo } from "../services/API";

export const UpdateHeroPage = () => {
  const [hero, setHero] = useState(null);
  const [preview, setPreview] = useState(null);
  const { id: heroId } = useParams();

  useEffect(() => {
    getHeroById(heroId).then((data) => setHero(data));
  }, [heroId]);

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

    const newHero = await createHeroInfo(body);
    console.log(newHero);
    // formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      nikname: hero?.nikname,
      name: hero?.name,
      origin: hero?.origin,
      superPowers: hero?.superPowers,
      catchPhrase: hero?.catchPhrase,
      image: "",
    },
    onSubmit: onSubmitFnc,
    validationSchema: Yup.object({
      nikname: Yup.string(),
      name: Yup.string(),
      origin: Yup.string(),
      image: Yup.mixed(),
    }),
  });

  return (
    <>
      <div>Create your hero</div>
      {hero && (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="nikname">
            <input
              id="nikname"
              type="text"
              placeholder="nikname"
              onChange={formik.handleChange}
              value={formik.values.nikname}
            />
          </label>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              placeholder="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </label>
          <label htmlFor="origin">
            <input
              id="origin"
              type="text"
              placeholder="origin"
              onChange={formik.handleChange}
              value={formik.values.origin}
            />
          </label>
          <label htmlFor="superPowers">
            <input
              id="superPowers"
              type="text"
              placeholder="Super Powers"
              onChange={formik.handleChange}
              value={formik.values.superPowers}
            />
          </label>
          <label htmlFor="catchPhrase">
            <textarea
              id="catchPhrase"
              type="textarea"
              placeholder="Catch Phrase"
              onChange={formik.handleChange}
              value={formik.values.catchPhrase}
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
              // value={formik.values.image}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};
