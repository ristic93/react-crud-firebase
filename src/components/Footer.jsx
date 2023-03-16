import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <p>Copyright © {new Date().getFullYear()} Aleksandar Ristic</p>
    </footer>
  );
};

export default Footer;