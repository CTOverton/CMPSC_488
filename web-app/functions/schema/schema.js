const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id:             {type: GraphQLString },
        createdAt:      {type: GraphQLInt },
        createdBy:      {type: GraphQLString },
        description:    {type: GraphQLString },
        title:          {type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        event: {
            type: EventType,
            args: {id: {type: GraphQLString } },
            resolve(parent, args) {
                // code to get data from db
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})