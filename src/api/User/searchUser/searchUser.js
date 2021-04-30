import client from "../../../client"

export default {
  Query: {
    searchUser: (_, { term }) => client.user.findMany({ where: { username: { startsWith: term } } })
  }
}