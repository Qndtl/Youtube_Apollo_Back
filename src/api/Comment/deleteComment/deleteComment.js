import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { commentId }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({ where: { id: commentId } });
      if (!comment) {
        return {
          ok: false,
          error: "Comment not found."
        }
      }
      if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You are not authorized to delete comment."
        }
      }
      await client.comment.delete({ where: { id: commentId } });
      return {
        ok: true
      }
    })
  }
}