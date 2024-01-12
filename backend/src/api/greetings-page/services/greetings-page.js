'use strict';

/**
 * greetings-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::greetings-page.greetings-page');
