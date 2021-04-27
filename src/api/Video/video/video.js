import client from "../../../client"

export default {
  Query: {
    video: async (_, { videoId }) => {
      const video = await client.video.findUnique({ where: { id: videoId }, include: { user: { select: { id: true, username: true, avatar: true } } } });
      return video;
    }
  }
}