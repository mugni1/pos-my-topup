import { BaggageClaim, GalleryVerticalEnd, Gamepad, LayoutDashboardIcon, LucideBox, SquareTerminal, TagsIcon } from "lucide-vue-next";

export const data = {
    header: {
        name: 'POS MYTOPUP',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
    },
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [{ title: 'History', url: '#' }],
        },
    ],
    routes: [
        { name: 'Dashboard', url: '/', icon: LayoutDashboardIcon },
        { name: 'Categories', url: '/categories', icon: TagsIcon },
        { name: 'Items', url: '/items', icon: LucideBox },
        { name: 'Orders', url: '/orders', icon: BaggageClaim },
        { name: 'Games', url: '/games', icon: Gamepad },
    ],
}