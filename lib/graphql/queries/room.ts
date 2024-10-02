export const GET_ROOMS = gql`
  query GetRooms {
    rooms {
      id
      title
      host {
        username
        email
      }
      isOpen
      description
      code
      createdAt
      updatedAt
    }
  }
`;

export const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(id: $id) {
      id
      title
      host {
        username
        email
      }
      participants {
        user {
          username
          email
        }
        role
      }
      isOpen
      description
      code
      createdAt
      updatedAt
    }
  }
`;
