import { IconType } from "react-icons";
import { SlHome, SlPeople, SlUserFollow, SlBag } from "react-icons/sl";

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
        icon: SlPeople,
        title: "Bem-vindo",
        description: "Página inicial",
        path: "/",
      },
    ],
  },
  {
    group: "CONTEÚDO",
    links: [
      {
        icon: SlPeople,
        title: "Cidades",
        description: "Página de gerenciamento da entidade City",
        path: "/cities",
      },
      {
        icon: SlUserFollow,
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
        icon: SlPeople,
        title: "Postagens pendentes",
        description: "Página de gerenciamento de pendências da entidade Post",
        path: "/pending/posts",
      },
    ],
  },
  {
    group: "USUÁRIOS",
    links: [
      {
        icon: SlPeople,
        title: "Usuários",
        description: "Página de gerenciamento da entidade Usuário",
        path: "/users",
      },
    ],
  },
];
