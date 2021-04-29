import client from "../../../client";

export default {
  Query: {
    getUser: (_, { id }) => client.user.findUnique({
      where: {
        id
      },
      include: {
        videos: true,
        followers: {
          select: {
            id: true
          }
        }
      }
    })
  }
}