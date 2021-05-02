import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import morgan from 'morgan';
import { resolvers, typeDefs } from './schema';
import { getUser } from './utils/user.utils';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());

const server = new ApolloServer({
  typeDefs, resolvers, playground: true, context: async (ctx) => {
    return {
      loggedInUser: await getUser(ctx.req.headers.token)
    }
  }
});

server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/graphql`));