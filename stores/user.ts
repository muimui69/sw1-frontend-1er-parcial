import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null as string | null,
        user: null as object | null,
    }),
    actions: {
        setUser(token: string, user: object) {
            this.token = token;
            this.user = user;
        },
        clearUser() {
            this.token = null;
            this.user = null;
        },
    },
});
