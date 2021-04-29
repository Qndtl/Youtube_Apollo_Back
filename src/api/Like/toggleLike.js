import client from "../../client";
import { protectedResolver } from "../../utils/user.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { videoId }, { loggedInUser }) => {
      const video = await client.video.findUnique({ where: { id: videoId }, include: { likes: true } });
      if (!video) {
        return {
          ok: false,
          error: "Video not found."
        }
      }
      //check if loggedInUser already liked the video
      const like = await client.like.findUnique({
        where: {
          userId_videoId: {
            userId: loggedInUser.id,
            videoId
          }
        }
      });
      if (like) {
        await client.like.delete({ where: { id: like.id } });
      } else {
        await client.like.create({ data: { user: { connect: { id: loggedInUser.id } }, video: { connect: { id: videoId } } } });
      }
      return {
        ok: true
      }
    })
  }
}