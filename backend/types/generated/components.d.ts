import type { Schema, Attribute } from '@strapi/strapi';

export interface TranslationsMarkdown extends Schema.Component {
  collectionName: 'components_translations_markdowns';
  info: {
    displayName: 'Markdown';
  };
  attributes: {
    mn: Attribute.RichText & Attribute.Required;
    eng: Attribute.RichText & Attribute.Required;
  };
}

export interface TranslationsOrchuulga extends Schema.Component {
  collectionName: 'components_utils_orchuulga';
  info: {
    displayName: '\u0411\u043E\u0433\u0438\u043D\u043E \u0442\u0435\u043A\u0441\u0442';
    description: '';
  };
  attributes: {
    mn: Attribute.String & Attribute.Required;
    eng: Attribute.String & Attribute.Required;
  };
}

export interface TranslationsUrtTekst extends Schema.Component {
  collectionName: 'components_translations_urt_tekst';
  info: {
    displayName: '\u0423\u0440\u0442 \u0442\u0435\u043A\u0441\u0442';
  };
  attributes: {
    mn: Attribute.Text & Attribute.Required;
    eng: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'translations.markdown': TranslationsMarkdown;
      'translations.orchuulga': TranslationsOrchuulga;
      'translations.urt-tekst': TranslationsUrtTekst;
    }
  }
}
