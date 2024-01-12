'use strict';

/**
 * greetings-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::greetings-page.greetings-page');
