import { FiSun, FiLink } from "react-icons/fi";
import { HOME_PAGE } from '../../../constants';
import FooterLink from './FooterLink';
import "./footer.css";

type Links = {
  title: string; 
  path: string;
};

export type FooterLinks = {
  group: string;
  links: Links[];
};

const FOOTER_LINKS: FooterLinks[] = [
  {
    group: HOME_PAGE.title_group2_footer, 
    links: [
      {
        title: HOME_PAGE.title_group2_link1_footer,
        path: HOME_PAGE.title_group2_link1_path_footer,
      },
      {
        title: HOME_PAGE.title_group2_link2_footer,
        path: HOME_PAGE.title_group2_link2_path_footer,
      },
      {
        title: HOME_PAGE.title_group2_link3_footer,
        path: HOME_PAGE.title_group2_link3_path_footer
      },
    ]
  },
];

const Footer = () => {
  return (
    <div className="footer gradient-bg" id="footer">
      <FiSun size={50} color={"white"} />
      <div className="footer-content">
        {FOOTER_LINKS.map((item, index) => (
          <FooterLink key={index} group={item.group} links={item.links} />        
        ))}
      </div>
    </div>
  );
};

export default Footer;
