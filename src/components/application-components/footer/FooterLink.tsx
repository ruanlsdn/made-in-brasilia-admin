import React from "react";
import { FiMail, FiLinkedin, FiLink } from "react-icons/fi";
import { FooterLinks } from "./Footer";
import { HOME_PAGE } from "../../../constants";
import "./footer-links.css";

const FooterLink = ({ group, links }: FooterLinks) => {
  return (
    <div className="footer-link">
      <h3>{group}</h3>
      {links.map((link, index) => (
        <div key={index}>
          <a href={link.path}>
            {group === HOME_PAGE.title_group1_footer ? (
              <FiLinkedin size={20} color={"white"} /> 
            ) : group === HOME_PAGE.title_group3_footer ? (
              <FiMail size={20} color={"white"} /> 
            ) : (
              <FiLink size={20} color={"white"} /> 
            )}
            <span style={{ marginLeft: '8px' }}>{link.title}</span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default FooterLink;
