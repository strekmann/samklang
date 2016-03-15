import graphqlHTTP from 'express-graphql';
import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
import { connectDB } from 'libby';
connectDB(mongoose, {
    servers: config.get('mongodb.servers'),
    replset: config.get('mongodb.replset'),
});

import cookieParser from 'cookie-parser';
import connectRedis from 'connect-redis';
import session from 'express-session';

import { User } from './server/models';

const app = express();
app.use(cookieParser(config.get('session.cookiesecret')));
const RedisStore = connectRedis(session);
const redisStoreOpts = config.get('redis');
redisStoreOpts.ttl = config.get('session.ttl') / 1000;
const sessionStore = new RedisStore(redisStoreOpts);

app.use(session({
    store: sessionStore,
    secret: config.get('session.secret'),
    name: config.get('session.name'),
    resave: config.get('session.resave'),
    saveUninitialized: config.get('session.saveUninitialized'),
    rolling: config.get('session.rolling'),
    cookie: {
        maxAge: config.get('session.ttl'),
    },
}));


import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
    },
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user: {
                type: userType,
                args: {
                    id: {type: GraphQLString},
                },
                resolve: function(_, args) {
                    return User.findById(args.id).exec();
                }
            },
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                },
            },
        },
    }),
});

app.use('/gql', graphqlHTTP(request => ({
    schema,
    rootValue: { session: request.session },
    pretty: true,
    formatError: error => ({
        message: error.message,
        locations: error.location,
        stack: error.stack,
    }),
})));

app.listen(3001, () => {
    console.log('Im up');
});
