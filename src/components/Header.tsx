import { Button } from "@/components/ui/button";
import { SunDimIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="m-2 flex flex-row justify-end items-end">
      <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
        <SunDimIcon className="mr-2 h-4 w-4" />{" "}
        {darkMode ? "Light Mode" : "Dark Mode"}
      </Button>
    </div>
  );
}
