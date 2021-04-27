import client from "../../../client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await client.user.findUnique({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: "Email not found. Sign up first."
        }
      }
      const chkPassword = await bcrypt.compare(password, user.password);
      if (!chkPassword) {
        return {
          ok: false,
          error: "Incorrect password. Check your pw again."
        }
      }
      const token = jwt.sign({ id: user.id }, "jwt-secret");
      return {
        ok: true,
        token
      }
    }
  }
}