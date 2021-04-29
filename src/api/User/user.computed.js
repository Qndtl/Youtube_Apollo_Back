import client from "../../client";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const user = await client.user.findUnique({ where: { id }, include: { followers: { select: { id: true } } } });
      return Boolean(user.followers.filter(follower => follower.id === loggedInUser.id)[0]);
    },
    totalFollowerNum: async ({ id }) => {
      const user = await client.user.findUnique({ where: { id }, include: { followers: { select: { id: true } } } });
      return user.followers.length;
    }
  }
}