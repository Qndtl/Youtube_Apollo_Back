import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import morgan from 'morgan';
import { resolvers, typeDefs } from './schema';
import { getUser } from './utils/user.utils';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const server = new ApolloServer({
  typeDefs, resolvers, context: async (ctx) => {
    return {
      loggedInUser: await getUser(ctx.req.headers.token)
    }
  }
});

server.applyMiddleware({ app });

app.listen(4000, () => console.log(`Server running on http://localhost:4000/graphql`));