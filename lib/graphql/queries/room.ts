import gql from 'graphql-tag'


export const GET_MY_ROOMS = gql`
  query RoomsByUser($userId: String!) {
    RoomByUser(userId: $userId) {
      id
      title
      isOpen
      description
      code
      createdAt
      updatedAt
    }
}
`;


export const GET_MY_SHARED_ROOMS = gql`
 query RoomByHostInvitated($userId: String!) {
  RoomByHostInvitated(userId: $userId) {
    id
    title
    isOpen
    description
    code
    host{
      email
      role
    },
    participants {
      user{
        email
        password
      }
      role
    }
  }
}
`;



export const GET_INVITATIONS_BY_HOST = gql`
query InvitationsByHost($userId: String!) {
  InvitationsByHost(userId: $userId) {
    id
    email
    status
  }
}
`;


// export const GET_ROOMS = gql`
//   query Rooms {
//     rooms {
//       id
//       title
//       host {
//         username
//         email
//       }
//       isOpen
//       description
//       code
//       createdAt
//       updatedAt
//     }
//   }
// `;


// export const GET_ROOM = gql`
//   query GetRoom($id: ID!) {
//     room(id: $id) {
//       id
//       title
//       host {
//         username
//         email
//       }
//       participants {
//         user {
//           username
//           email
//         }
//         role
//       }
//       isOpen
//       description
//       code
//       createdAt
//       updatedAt
//     }
//   }
// `;
