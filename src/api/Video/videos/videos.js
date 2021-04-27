import client from "../../../client"

export default {
  Query: {
    videos: () => client.video.findMany({ include: { user: true } })
  }
}