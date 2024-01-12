export interface IMainMenuItem {
  id: number;
  priority: number;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  child: (IDropdownMenu | IMegaMenu)[];
}

export interface IDropdownMenu {
  id: number;
  items: IMenuItem[];
  __component: 'menu.dropdown';
}

export interface IMegaMenu {
  id: number;
  __component: 'menu.mega-menu';
  menuItems: IMegaMenuItem[];
}

export interface IMegaMenuItem {
  id: number;
  title: string;
  items: IMenuItem[];
}

export interface IMenuItem {
  id: number;
  title: string;
  link: string;
}
