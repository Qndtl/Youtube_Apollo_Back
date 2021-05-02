import client from "../../../client"

export default {
  Mutation: {
    addView: async (_, { videoId }) => {
      const video = await client.video.findUnique({ where: { id: videoId } });
      if (!video) {
        return {
          ok: false,
          error: "Video not found."
        }
      }
      await client.video.update({ where: { id: videoId }, data: { view: video.view + 1 } });
      return {
        ok: true
      }
    }
  }
}