import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    createComment: protectedResolver(async (_, { videoId, text }, { loggedInUser }) => {
      const video = await client.video.findUnique({ where: { id: videoId } });
      if (!video) {
        return {
          ok: false,
          error: "Video not found."
        }
      }
      const newComment = await client.comment.create({
        data: {
          text,
          user: {
            connect: {
              id: loggedInUser.id
            }
          },
          video: {
            connect: {
              id: videoId
            }
          }
        }
      });
      console.log(newComment);
      return {
        ok: true
      }
    })
  }
}