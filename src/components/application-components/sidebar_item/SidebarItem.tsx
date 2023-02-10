import { NavLink } from "react-router-dom";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import { SidebarData } from "../sidebar/sidebar_data";
import "./sidebar_item.css";

type SidebarItemProps = {
  item: SidebarData;
};

const SidebarItem = ({ item }: SidebarItemProps) => {
  const {
    isSidebarActive,
    setIsSidebarActive,
    screenSize,
    activeRoute,
    setActiveRoute,
  } = useApplicationControlContext();

  const handleCloseSideBar = () => {
    if (isSidebarActive && screenSize! <= 900) {
      setIsSidebarActive(false);
    }
  };

  return (
    <div className="sidebar-item__container">
      <div className="sidebar-item__group">
        <span>{item.group}</span>
      </div>
      <div className="sidebar-item__divider gradient-bg-colorful" />
      {item.links.map((link) => (
        <div className="sidebar-item__link" key={link.path}>
          <NavLink
            className={
              activeRoute?.path == link.path
                ? "sidebar-item__link-nav__active"
                : "sidebar-item__link-nav"
            }
            to={link.path}
            onClick={() => {
              handleCloseSideBar();
              setActiveRoute(link);
            }}
          >
            <div className="sidebar-item-button__content">
              <link.icon size={22} />
              <span>{link.title}</span>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default SidebarItem;
