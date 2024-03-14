/*import { ThemeContext, themes } from "contexts/ThemeWrapper";*/
import React, {createContext, useEffect, useState} from "react";

export const themes = {
  dark: "",
  light: "white-content",
};

export const ThemeContext = createContext({
  theme: themes.light,
  changeTheme: () => {},
});

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("white-content");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("white-content");
        break;
    }
  }, [theme]);

  function changeTheme(theme) {
    setTheme(theme);
  }

  return (
    <ThemeContext.Provider value={{ theme: theme, changeTheme: changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}