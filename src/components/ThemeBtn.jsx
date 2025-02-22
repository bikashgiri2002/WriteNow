import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons"; // Import icons
import { library } from "@fortawesome/fontawesome-svg-core";

// Add icons to library
library.add(faSun, faMoon);

const ThemeBtn = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [isOn, setIsOn] = useState(theme === "light");

  const toggle = () => {
    dispatch(toggleTheme());
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
    setIsOn(!isOn);
  };

  return (
    <button
      onClick={toggle}
      className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-500"
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isOn ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </div>
    </button>
  );
};

export default ThemeBtn;
