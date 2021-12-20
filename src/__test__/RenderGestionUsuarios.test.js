import React from 'react';
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache,} from "@apollo/client";
import {render, screen, waitFor} from '@testing-library/react';
import { UserContext } from "context/userContext";
import GestionUsuarios from 'pages/usuarios/GestionUsuarios';
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
    //uri: "http://localhost:4000/graphql",
    uri: "https://adasoft-server-backend.herokuapp.com/graphql",
});
    
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = JSON.parse(localStorage.getItem("token"));
    // return the headers to the context so httpLink can read them
    return {
    headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
    },
    };
});
    
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

it('Loading en gestión de usuarios', ()=>{
    render(
        <ApolloProvider client={client}>
            <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>            
                <GestionUsuarios/>                               
            </UserContext.Provider>
        </ApolloProvider>
        
    );
    expect(screen.getByTestId('loading')).toHaveTextContent('Loading...');
});

it('componente React Loading', async()=>{
    render(
        <ApolloProvider client={client}>
            <UserContext.Provider value={{ userData: { rol: "LIDER" } }}>            
                <GestionUsuarios/>                               
            </UserContext.Provider>
        </ApolloProvider>
        
    );     
    expect(screen.getByTestId('reactLoading')).toBeInTheDocument();   
   
});

