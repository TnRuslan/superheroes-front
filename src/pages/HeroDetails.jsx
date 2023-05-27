import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { deleteHero, getHeroById, updateHeroById } from "../API";
import { Link } from "react-router-dom";
import { Form } from "../components/Form";
import { Box, Button, Container, Typography } from "@mui/material";
import styled from "styled-components";

const BackLink = styled(Link)`
  width: 100px;
  margin-top: 20px;
  display: block;
  padding: 10px;
  background-color: #dce3e5;
  border-radius: 4px;
  text-decoration: none;
  color: #2e2e2e;
  font-size: 18px;
  margin-bottom: 30px;
  &:hover {
    background-color: #cbe6e6;
  }
`;

export const HeroDetails = () => {
  const [hero, setHero] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const location = useLocation();
  const { id: heroId } = useParams();

  useEffect(() => {
    getHeroById(heroId).then((data) => setHero(data));
  }, [heroId]);

  return (
    <Container>
      <BackLink to={location.state?.from ?? "/"}> Go back</BackLink>
      {hero && (
        <Box sx={{ display: "flex", gap: "30px", marginBottom: "30px" }}>
          <img src={hero.images} alt={hero.nikname} width={300} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <Typography variant="h5">Nikname: {hero.nikname}</Typography>
            <Typography variant="h5">Name: {hero.name}</Typography>
            <Typography variant="h5">Origin: {hero.origin}</Typography>
            <Typography variant="h5">
              Super Powers: {hero.superPowers}
            </Typography>
            <Typography variant="h5">
              Catch Phrase: {hero.catchPhrase}
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        variant="contained"
        type="button"
        onClick={() => setIsOpenForm(!isOpenForm)}
      >
        edit hero
      </Button>

      {isOpenForm && <Form hero={hero} postFnc={updateHeroById} />}
    </Container>
  );
};
