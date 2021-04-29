import client from "../../client";

export default {
  Video: {
    likes: ({ id }) => client.video.findUnique({ where: { id } }).likes()
  }
}