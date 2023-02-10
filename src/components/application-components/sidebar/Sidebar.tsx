import { FiSun } from "react-icons/fi";
import { useApplicationControlContext } from "../../../contexts/ApplicationControlContext";
import SidebarItem from "../sidebar_item/SidebarItem";
import "./sidebar.css";
import { SIDEBAR_DATA } from "./sidebar_data";

const Sidebar = () => {
  const { searchText } = useApplicationControlContext();

  // TODO: apply the search filter to the sidebar data
  SIDEBAR_DATA.forEach((item, index) => {
    if (searchText !== null) {
      item.links.filter((link) =>
        link.title.toLowerCase().includes(searchText)
      );
    }
  });

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <FiSun size={60} color="white" />
        <span>Made In Brasilia</span>
      </div>
      <div className="sidebar-content">
        {SIDEBAR_DATA.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
