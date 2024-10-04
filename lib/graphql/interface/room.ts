export interface RoomByUser {
    RoomByUser: RoomByUserElement[];
}

export interface RoomByUserElement {
    __typename: string;
    id: string;
    title: string;
    isOpen: boolean;
    description: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface RoomShare {
    RoomByHostInvitated: RoomByHostInvitatedElement[];
}

export interface RoomByHostInvitatedElement {
    id: string;
    title: string;
    host: Host;
    isOpen: boolean;
    code: string;
    participants: Participant[];
    description: string;
    createdAt: Date;
    updatedAt: Date;
    __typename: string;
}

export interface Host {
    id: string;
    email: string;
    role: string;
    __typename: string;
}

export interface Participant {
    user: User;
    role: string;
    __typename: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    __typename: string;
}

