import type { Schema, Attribute } from '@strapi/strapi';

export interface MenuDropdown extends Schema.Component {
  collectionName: 'components_menu_dropdowns';
  info: {
    displayName: 'Dropdown';
  };
  attributes: {
    items: Attribute.Component<'menu.menu-item', true>;
  };
}

export interface MenuMegaMenuItem extends Schema.Component {
  collectionName: 'components_menu_mega_menu_items';
  info: {
    displayName: 'Mega Menu Item';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    items: Attribute.Component<'menu.menu-item', true> & Attribute.Required;
  };
}

export interface MenuMegaMenu extends Schema.Component {
  collectionName: 'components_menu_mega_menus';
  info: {
    displayName: 'Mega Menu';
  };
  attributes: {
    menuItems: Attribute.Component<'menu.mega-menu-item', true> &
      Attribute.Required;
  };
}

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'Menu Item';
    description: '';
  };
  attributes: {
    priority: Attribute.Integer & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'menu.dropdown': MenuDropdown;
      'menu.mega-menu-item': MenuMegaMenuItem;
      'menu.mega-menu': MenuMegaMenu;
      'menu.menu-item': MenuMenuItem;
    }
  }
}
