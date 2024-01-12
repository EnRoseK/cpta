'use strict';

/**
 * office-worker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::office-worker.office-worker');
