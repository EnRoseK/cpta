import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutUsVisionBlock extends Schema.Component {
  collectionName: 'components_about_us_vision_blocks';
  info: {
    displayName: 'visionBlock';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText;
  };
}

export interface ComponentSection extends Schema.Component {
  collectionName: 'components_component_sections';
  info: {
    displayName: 'Section';
    description: '';
  };
  attributes: {
    sectionTitle: Attribute.String & Attribute.Required;
  };
}

export interface GeneralBankAccount extends Schema.Component {
  collectionName: 'components_general_bank_accounts';
  info: {
    displayName: 'Bank Account';
  };
  attributes: {
    bankName: Attribute.String & Attribute.Required;
    accountNumber: Attribute.String & Attribute.Required;
    accountName: Attribute.String & Attribute.Required;
    transferValue: Attribute.String & Attribute.Required;
    eBarimt: Attribute.String & Attribute.Required;
  };
}

export interface HomeCta extends Schema.Component {
  collectionName: 'components_home_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    icon: Attribute.Media & Attribute.Required;
  };
}

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
    title: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about-us.vision-block': AboutUsVisionBlock;
      'component.section': ComponentSection;
      'general.bank-account': GeneralBankAccount;
      'home.cta': HomeCta;
      'menu.dropdown': MenuDropdown;
      'menu.mega-menu-item': MenuMegaMenuItem;
      'menu.mega-menu': MenuMegaMenu;
      'menu.menu-item': MenuMenuItem;
    }
  }
}
