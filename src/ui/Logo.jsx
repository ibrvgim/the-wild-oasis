import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { theme } = useDarkMode();

  return (
    <StyledLogo>
      <Img src={theme ? "/logo-dark.png" : "/logo-light.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
