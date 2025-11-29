import React, { useEffect, useState } from "react";

const themes = ["default", "light", "dark"]; // sample names matching CSS classes

export default function ThemeToggle(){
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");

  useEffect(()=>{
    const root = document.documentElement;
    root.classList.remove(...themes.map(t=>`theme-${t}`));
    root.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle">
      {themes.map(t => (
        <button key={t} onClick={()=>setTheme(t)} aria-label={t}>
          { /* could show circle icon */ }
        </button>
      ))}
    </div>
  );
}
