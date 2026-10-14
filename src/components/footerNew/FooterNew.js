import React from "react";
import {greeting} from "../../portfolio";
import "./FooterNew.scss";

const FooterNew = () => (
  <footer className="footer-new">
    <span>© {new Date().getFullYear()} {greeting.username}</span>
    <span>{greeting.location} · remote worldwide</span>
  </footer>
);

export default FooterNew;
