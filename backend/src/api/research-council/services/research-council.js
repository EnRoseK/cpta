'use strict';

/**
 * research-council service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::research-council.research-council');
