import type { User } from '@/lib/graphql/interface/user';
import { defineStore } from 'pinia';

interface UserState {
    token: string | null;
    user: User | null;
    isSignedIn: boolean;
}


export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        token: null,
        user: null,
        isSignedIn: false,
    }),
    actions: {
        setUser(user: User, token: string) {
            this.user = user;
            this.token = token;
            this.isSignedIn = true;
            if (process.client) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('authUser', JSON.stringify(user))
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            this.isSignedIn = false;

            if (process.client) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
            }
        },
        loadToken() {
            if (process.client) {
                const token = localStorage.getItem('authToken');
                const user = localStorage.getItem('authUser');
                if (token && user) {
                    this.token = token;
                    this.user = JSON.parse(user);
                    this.isSignedIn = true;
                }
            }
        },
        async checkAuth() {
            if (process.client) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    this.isSignedIn = true; ``
                }
            }

        },
    }
});

