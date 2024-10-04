import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';


export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();

    const apiUri = process.env.NODE_ENV === 'production'
        ? runtimeConfig.public.apiProd
        : runtimeConfig.public.apiDev;

    console.log("??????????????????", apiUri)
    const httpLink = createHttpLink({
        uri: apiUri
    });

    const apolloClient = new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });

    provideApolloClient(apolloClient);
});
