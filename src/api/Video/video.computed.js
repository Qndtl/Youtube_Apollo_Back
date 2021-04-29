import client from "../../client";

export default {
  Video: {
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const like = await client.like.findUnique({ where: { userId_videoId: { userId: loggedInUser.id, videoId: id } } });
      return Boolean(like);
    },
    totalLikeNum: async ({ id }) => {
      const video = await client.video.findUnique({ where: { id }, include: { likes: { select: { id: true } } } });
      return video.likes.length;
    }
  }
}