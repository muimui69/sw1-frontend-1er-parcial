import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

export default defineNuxtPlugin(() => {
    const httpLink = createHttpLink({
        uri: 'http://localhost:8080/graphql', // Cambia esta URL por la de tu API GraphQL
    });

    const apolloClient = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });

    provideApolloClient(apolloClient);
});
