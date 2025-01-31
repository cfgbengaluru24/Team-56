// src/Routes/Home/Home.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./Home.css";
import About from "./about";

import { getAuth } from "firebase/auth";
export function Home() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

  return (
    <>
      <Box
        className="home-page"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh"
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => handleNavigate("/loc", "poc")}
          sx={{
            mb: 2,
            padding: "12px 24px",
            fontSize: "1.25rem",
          }}
        >
          {t("become_a_poc")}
        </Button>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => handleNavigate("/loc", "donor")}
          sx={{
            padding: "12px 24px",
            fontSize: "1.25rem",
          }}
        >
          {t("become_a_donor")}
        </Button>

        {/* Language Switcher Buttons */}
        <Box mt={4}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => changeLanguage("en")}
            sx={{
              marginRight: 2,
            }}
          >
            English
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => changeLanguage("bn")}
          >
            বাংলা
          </Button>
        </Box>
      </Box>
      <About />
    </>
  );
}

export default Home;
