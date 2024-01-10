'use strict';

/**
 * tax-analyst service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tax-analyst.tax-analyst');
