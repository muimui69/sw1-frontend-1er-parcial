import { defineStore } from 'pinia';
import { GET_MY_ROOMS, GET_MY_SHARED_ROOMS } from '@/lib/graphql/queries/room';
import { useQuery } from '@vue/apollo-composable';
import type { RoomByHostInvitatedElement, RoomByUser, RoomByUserElement, RoomShare } from '../lib/graphql/interface/room';

interface RoomsState {
    rooms: RoomByUserElement[] | null;
    sharedRooms: RoomByHostInvitatedElement[] | null;
    loading: boolean;
    error: any | null;
}

export const useRoomsStore = defineStore('rooms', {
    state: (): RoomsState => ({
        rooms: null,
        sharedRooms: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchRoomsByUser(userId: string) {
            this.loading = true;
            this.error = null;

            try {
                const { onResult, onError } = useQuery(GET_MY_ROOMS, {
                    userId: userId
                });


                onResult(({ data }: { data: RoomByUser }) => {
                    this.rooms = data?.RoomByUser!! || [];
                    this.loading = false;
                });

                onError((fetchError) => {
                    this.error = fetchError;
                    this.loading = false;
                });

            } catch (err) {
                this.error = err;
                this.loading = false;
            }
        },
        async fetchSharedRooms(userId: string) {
            this.loading = true;
            this.error = null;

            try {
                const { onResult, onError } = useQuery(GET_MY_SHARED_ROOMS, {
                    userId: userId
                });

                onResult(({ data }: { data: RoomShare }) => {
                    console.log("?????????", data)
                    this.sharedRooms = data?.RoomByHostInvitated || [];
                    this.loading = false;
                });

                onError((fetchError) => {
                    this.error = fetchError;
                    this.loading = false;
                });
            } catch (err) {
                this.error = err;
                this.loading = false;
            }
        },
        clearRooms() {
            this.rooms = null;
            this.loading = false;
            this.error = null;
            this.sharedRooms = null;
        }
    },
});
