export const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
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

export const INVITE_TO_ROOM_MUTATION = gql`
  mutation InviteToRoom($roomId: ID!, $email: String!) {
    inviteToRoom(roomId: $roomId, email: $email) {
      id
      title
      invitations {
        email
        status
      }
    }
  }
`;

export const ACCEPT_INVITATION_MUTATION = gql`
  mutation AcceptInvitation($roomId: ID!) {
    acceptInvitation(roomId: $roomId) {
      id
      title
      participants {
        user {
          username
          email
        }
        role
      }
    }
  }
`;
