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

export interface FaqGroupQuestions extends Schema.Component {
  collectionName: 'components_faq_group_questions';
  info: {
    displayName: 'GroupQuestions';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    questions: Attribute.Component<'faq.question', true> & Attribute.Required;
  };
}

export interface FaqQuestion extends Schema.Component {
  collectionName: 'components_faq_questions';
  info: {
    displayName: 'Question';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.String & Attribute.Required;
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

export interface LogoLogo extends Schema.Component {
  collectionName: 'components_logo_logo';
  info: {
    displayName: '\u041B\u043E\u0433\u043E';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
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

export interface ResultErhOlgohShalgaltynDN extends Schema.Component {
  collectionName: 'components_result_erh_olgoh_shalgaltyn_d_n';
  info: {
    displayName: '\u042D\u0440\u0445 \u043E\u043B\u0433\u043E\u0445 \u0448\u0430\u043B\u0433\u0430\u043B\u0442\u044B\u043D \u0434\u04AF\u043D';
    description: '';
  };
  attributes: {
    subTitle: Attribute.String;
    title: Attribute.String;
    date: Attribute.Date;
    results: Attribute.Component<'result.excel-file', true>;
  };
}

export interface ResultErhSungahShalgaltynDN extends Schema.Component {
  collectionName: 'components_result_erh_sungah_shalgaltyn_d_n';
  info: {
    displayName: '\u042D\u0440\u0445 \u0441\u0443\u043D\u0433\u0430\u0445 \u0448\u0430\u043B\u0433\u0430\u043B\u0442\u044B\u043D \u0434\u04AF\u043D';
  };
  attributes: {
    title: Attribute.String;
    leftTitleOne: Attribute.String;
    leftTitleTwo: Attribute.String;
    rightTitle: Attribute.String;
    picture: Attribute.Media;
  };
}

export interface ResultExcelFile extends Schema.Component {
  collectionName: 'components_result_excel_files';
  info: {
    displayName: 'Excel file';
  };
  attributes: {
    excelFile: Attribute.Media;
  };
}

export interface ResultSorilShalgaltynDN extends Schema.Component {
  collectionName: 'components_result_soril_shalgaltyn_d_n';
  info: {
    displayName: '\u0421\u043E\u0440\u0438\u043B \u0448\u0430\u043B\u0433\u0430\u043B\u0442\u044B\u043D \u0434\u04AF\u043D';
    description: '';
  };
  attributes: {
    subTitle: Attribute.String;
    title: Attribute.String;
    results: Attribute.Component<'result.excel-file', true>;
    date: Attribute.Date;
  };
}

export interface RulesRegulationsRegulations extends Schema.Component {
  collectionName: 'components_rules_regulations_regulations';
  info: {
    displayName: 'Regulations';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    link: Attribute.String;
    description: Attribute.Text & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
  };
}

export interface RulesRegulationsRules extends Schema.Component {
  collectionName: 'components_rules_regulations_rules';
  info: {
    displayName: 'rules';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    link: Attribute.String;
    newTab: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>;
  };
}

export interface StaticpagePdf extends Schema.Component {
  collectionName: 'components_staticpage_pdfs';
  info: {
    displayName: 'PDF';
  };
  attributes: {
    file: Attribute.Media & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about-us.vision-block': AboutUsVisionBlock;
      'component.section': ComponentSection;
      'faq.group-questions': FaqGroupQuestions;
      'faq.question': FaqQuestion;
      'general.bank-account': GeneralBankAccount;
      'home.cta': HomeCta;
      'logo.logo': LogoLogo;
      'menu.dropdown': MenuDropdown;
      'menu.mega-menu-item': MenuMegaMenuItem;
      'menu.mega-menu': MenuMegaMenu;
      'menu.menu-item': MenuMenuItem;
      'result.erh-olgoh-shalgaltyn-d-n': ResultErhOlgohShalgaltynDN;
      'result.erh-sungah-shalgaltyn-d-n': ResultErhSungahShalgaltynDN;
      'result.excel-file': ResultExcelFile;
      'result.soril-shalgaltyn-d-n': ResultSorilShalgaltynDN;
      'rules-regulations.regulations': RulesRegulationsRegulations;
      'rules-regulations.rules': RulesRegulationsRules;
      'staticpage.pdf': StaticpagePdf;
    }
  }
}
