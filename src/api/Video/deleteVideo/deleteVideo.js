import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    deleteVideo: protectedResolver(async (_, { videoId }, { loggedInUser }) => {
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
          error: "You are not authorized to delete video."
        }
      }
      await client.video.delete({ where: { id: videoId } });
      console.log('deleted')
      return {
        ok: true
      }
    })
  }
}