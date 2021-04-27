import client from '../../../client';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    createUser: async (_, { email, username, fullname, password }) => {
      console.log(email, username, fullname, password);
      const existingEmail = await client.user.findUnique({ where: { email } });
      if (existingEmail) {
        return {
          ok: false,
          error: "Email is already taken."
        }
      }
      const existingUsername = await client.user.findUnique({ where: { username } });
      if (existingUsername) {
        return {
          ok: false,
          error: "Username is already taken."
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await client.user.create({ data: { email, username, fullname, password: hashedPassword } });
      console.log("✅New User Created!!✅");
      console.log(newUser);
      return {
        ok: true
      }
    }
  }
}