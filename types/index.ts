// import { Icons } from "../components/Icons.vue"
// export type NavLink = any
// export type SidebarNavItem = {
//     title: string
//     disabled?: boolean
//     external?: boolean
//     icon?: keyof typeof Icons
// } & (
//         | {
//             href: string
//             items?: never
//         }
//         | {
//             href?: string
//             items: NavLink[]
//         }
//     )

// export type SiteConfig = {
//     name: string
//     description: string
// }


export type NavItem = {
    title: string
    href: string
    disabled?: boolean
}

export type MarketingConfig = {
    mainNav: NavItem[]
}

// export type DashboardConfig = {
//     mainNav: MainNavItem[]
//     sidebarNav: SidebarNavItem[]
// }
