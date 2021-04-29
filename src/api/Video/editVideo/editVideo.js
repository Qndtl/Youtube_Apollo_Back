import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    editVideo: protectedResolver(async (_, { videoId, title, description }, { loggedInUser }) => {
      const video = await client.video.findUnique({ where: { id: videoId } });
      if (!video) {
        return {
          ok: false,
          error: "Video not found."
        }
      }
      if (video.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "You are not authorized to edit this video."
        }
      }
      await client.video.update({ where: { id: videoId }, data: { title, description } });
      return {
        ok: true
      }
    })
  }
}