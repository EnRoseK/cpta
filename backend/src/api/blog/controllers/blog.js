"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query("api::blog.blog").findOne({
      where: { slug: id },
      populate: ["thumbnail", "category"],
    });
    const sanitziedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitziedEntity);
  },
}));
