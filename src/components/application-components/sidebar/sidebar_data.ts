import { IconType } from "react-icons";
import { SlHome, SlPeople, SlUserFollow, SlBag } from "react-icons/sl";
import { GiModernCity } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { BsShop, BsClipboard } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

export type Links = {
  icon: IconType;
  title: string;
  description: string;
  path: string;
};

export type SidebarData = {
  group: string;
  links: Links[];
};

export const SIDEBAR_DATA: SidebarData[] = [
  {
    group: "INÍCIO",
    links: [
      {
        icon: AiOutlineHome,
        title: "Bem-vindo",
        description: "Página inicial",
        path: "/home",
      },
    ],
  },
  {
    group: "CONTEÚDO",
    links: [
      {
        icon: GiModernCity,
        title: "Bairros",
        description: "Página de gerenciamento da entidade City",
        path: "/cities",
      },
      {
        icon: BsClipboard,
        title: "Postagens",
        description: "Página de gerenciamento da entidade Post",
        path: "/posts",
      },
    ],
  },
  {
    group: "MODERAÇÃO",
    links: [
      {
        icon: FaChalkboardTeacher,
        title: "Postagens pendentes",
        description: "Página de gerenciamento de pendências da entidade Post",
        path: "/pending-posts",
      },
    ],
  },
  {
    group: "USUÁRIOS",
    links: [
      {
        icon: SlPeople,
        title: "Usuários",
        description: "Página de gerenciamento da entidade User",
        path: "/users",
      },
    ],
  },
];
