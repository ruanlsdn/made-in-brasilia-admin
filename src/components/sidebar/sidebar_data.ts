import { IconType } from "react-icons";
import { SlHome, SlPeople, SlUserFollow, SlBag } from "react-icons/sl";

export type Links = {
    icon: IconType,
    title: string,
    description: string,
    path: string,
}

export type SidebarData = {
    group: string,
    links: Links[]
}

export const SIDEBAR_DATA: SidebarData[] = [
    {
        group: "DASHBOARD",
        links: [
            {
                icon: SlPeople,
                title: "Bem-vindo",
                description: "Página inicial",
                path: "/"
            },
        ]
    },
    {
        group: "LUGARES",
        links: [
            {
                icon: SlPeople,
                title: "Cidades",
                description: "Página de gerenciamento da entidade Cidade",
                path: "/cities"
            },
            {
                icon: SlUserFollow,
                title: "Pontos Turísticos",
                description: "Página de gerenciamento da entidade PontoTuristico",
                path: "/places"
            },
        ]
    },
     {
        group: "PENDÊNCIAS",
        links: [
            {
                icon: SlPeople,
                title: "Publicações",
                description: "Página de moderamento de novas publicações",
                path: "/pendent/publications"
            },
        ]
    },
    {
        group: "USUÁRIOS",
        links: [
            {
                icon: SlPeople,
                title: "Usuários",
                description: "Página de gerenciamento da entidade Usuário",
                path: "/users"
            },
        ]
    },
    
]