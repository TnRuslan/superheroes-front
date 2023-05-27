import { Home } from "./pages/Home";
import { CreateHeroPage } from "./pages/CreateHeroPage";
import { HeroDetails } from "./pages/HeroDetails";
import { UpdateHeroPage } from "./pages/UpdateHeroPage";
import { Routes, Route, NavLink } from "react-router-dom";
import { Form } from "./components/Form";
import styled from "styled-components";
import { Box } from "@mui/material";

const NavItem = styled(NavLink)`
  font-size: 30px;
  padding: 20px;
  border-radius: 4px;
  background-color: #98bec7;
  text-decoration: none;
  color: #0e0e0e;
  &.active {
    color: #f3f3f3;
    background-color: #b9cfd4;
  }
`;

function App() {
  return (
    <>
      <div>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/create">Create Hero</NavItem>
        </Box>
        <nav></nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateHeroPage />} />
        <Route path="/hero/:id" element={<HeroDetails />}>
          <Route path="edit" element={<Form />} />
        </Route>
        <Route path="/update/:id" element={<UpdateHeroPage />} />
      </Routes>
    </>
  );
}

export default App;
