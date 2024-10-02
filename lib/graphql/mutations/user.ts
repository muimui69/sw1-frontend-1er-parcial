import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      user {
        id
        username
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;




export const REGISTER_MUTATION = gql`
  mutation register($createUserInput: CreateUserInput!) {
    register(createUserInput: $createUserInput) {
      token
      user {
        id
        username
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;
