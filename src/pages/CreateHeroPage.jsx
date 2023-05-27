import { Container, Typography } from "@mui/material";
import { createHeroInfo } from "../API";

import { Form } from "../components/Form";

export const CreateHeroPage = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", marginBottom: "40px" }}
      >
        Create your hero
      </Typography>
      <Form postFnc={createHeroInfo} />
    </Container>
  );
};
