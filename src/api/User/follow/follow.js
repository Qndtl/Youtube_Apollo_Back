import client from "../../../client";
import { protectedResolver } from "../../../utils/user.utils";

export default {
  Mutation: {
    follow: protectedResolver(async (_, { username }, { loggedInUser }) => {
      if (username === loggedInUser.username) {
        return {
          ok: false,
          error: "Can't follow yourself."
        }
      }
      const chkUser = await client.user.findUnique({ where: { username }, include: { followers: { select: { username: true } } } });
      if (!chkUser) {
        return {
          ok: false,
          error: "User not found."
        }
      }
      if (chkUser.followers.filter(user => user.username === loggedInUser.username).length > 0) {
        await client.user.update({ where: { username }, data: { followers: { disconnect: { id: loggedInUser.id } } } });
      } else {
        await client.user.update({ where: { username }, data: { followers: { connect: { id: loggedInUser.id } } } });
      }
      return {
        ok: true
      }
    })
  }
}