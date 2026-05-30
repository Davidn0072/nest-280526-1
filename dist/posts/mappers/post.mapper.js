"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPostResponse = toPostResponse;
const common_1 = require("@nestjs/common");
function toPostResponse(post, userId) {
    const resolvedUserId = userId ?? post.user?.id;
    if (!resolvedUserId) {
        throw new common_1.InternalServerErrorException('Post is missing user relation');
    }
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        userId: resolvedUserId,
    };
}
//# sourceMappingURL=post.mapper.js.map