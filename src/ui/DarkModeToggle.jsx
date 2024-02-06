import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

function DarkModeToggle() {
  const { theme, handleTheme } = useDarkMode();

  return (
    <ButtonIcon onClick={handleTheme}>
      {theme ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
