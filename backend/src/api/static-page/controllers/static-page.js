"use strict";

/**
 * static-page controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::static-page.static-page",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;

      const entity = await strapi.db
        .query("api::static-page.static-page")
        .findOne({
          where: { slug: id },
        });
      const sanitziedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitziedEntity);
    },
  })
);
