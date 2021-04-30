import client from "../../client";

export default {
  Comment: {
    video: ({ id }) => client.comment.findUnique({ where: { id } }).video(),
    user: ({ id }) => client.comment.findUnique({ where: { id } }).user(),
  }
}