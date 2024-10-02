export const GET_USERS = gql`
  query {
    Users {
      id
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export const GET_VIEWER = gql`
  query Viewer {
    viewer {
      id
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`;
