import brasilia_banner from "../../../assets/brasilia_banner_v2.png";
import "./banner.css";

const Banner = () => {
  return (
    <div className="banner ">     
        <div className="banner-content-img">
          <img src={brasilia_banner} alt="catedral" />
        </div>
    </div>
  );
};

export default Banner;
