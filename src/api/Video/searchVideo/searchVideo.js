import client from "../../../client";

export default {
  Query: {
    searchVideo: (_, { term }) => client.video.findMany({
      where: { OR: [{ title: { contains: term } }, { description: { contains: term } }] },
      include: { user: { select: { id: true, avatar: true, username: true } } }
    })
  }
}