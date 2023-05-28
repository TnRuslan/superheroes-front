import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllHero } from "../services/API";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
import styled from "styled-components";
import UnknownHero from "../images/unknown.jpg";

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  border-radius: 4px;
  background-color: #98bec7;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  color: #020202;
  &:hover {
    background-color: #b9cfd4;
  }
`;

export const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageQuantity, setPageQuantity] = useState(0);
  const location = useLocation();

  const handlePagination = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getAllHero(page - 1).then((data) => {
      setPageQuantity(Math.ceil(data.totalCount / 5));
      setHeroes(data.result);
    });
  }, [page]);

  return (
    <Container
      maxWidth="1200"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Typography variant="h1">Superheroes</Typography>
      {heroes && heroes.length ? (
        <Grid container spacing={2} sx={{}}>
          {heroes.map((hero) => {
            return (
              <Grid item key={hero._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={hero.images || UnknownHero}
                    alt={hero.nikname}
                    width={300}
                  />
                  <Box
                    sx={{
                      padding: "20px",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ textAlign: "center", marginBottom: "20px" }}
                    >
                      {hero.nikname}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button variant="contained" color="error">
                        Delete
                      </Button>
                      <StyledLink
                        to={`/hero/${hero._id}`}
                        state={{ from: location }}
                      >
                        TO DETAILS
                      </StyledLink>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h4">Then are no heroes</Typography>
      )}
      {page >= 1 && (
        <Stack>
          <Pagination
            count={pageQuantity}
            page={page}
            onChange={handlePagination}
            variant="outlined"
          />
        </Stack>
      )}
    </Container>
  );
};
