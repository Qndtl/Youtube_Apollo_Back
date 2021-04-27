import jwt from 'jsonwebtoken';
import client from '../client';

export const getUser = async (token) => {
  try {
    if (!token) {
      return;
    }
    const { id } = jwt.verify(token, "jwt-secret");
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      return;
    }
    return user;
  } catch (e) {
    console.log(e.message);
    return;
  }
}

export const protectedResolver = (ourResolver) => (parent, args, ctx, info) => {
  if (!ctx.loggedInUser) {
    const query = info.operation.operation === "query";
    if (query) {
      return null;
    } else {
      return {
        ok: false,
        error: "You need to login"
      }
    }
  }
  return ourResolver(parent, args, ctx, info)
}