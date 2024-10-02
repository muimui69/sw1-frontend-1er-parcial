import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null as string | null,
        user: null as object | null,
        isSignedIn: false,
    }),
    actions: {
        setUser(user: any, token: string) {
            this.user = user;
            this.token = token;
            this.isSignedIn = true;
            // Solo guardar en localStorage si estamos en el cliente
            if (process.client) {
                localStorage.setItem('authToken', token);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            this.isSignedIn = false;

            if (process.client) {
                localStorage.removeItem('authToken');
            }
        },
        loadToken() {
            if (process.client) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    this.token = token;
                }
            }
        },
        async checkAuth() {
            if (process.client) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    this.isSignedIn = true;
                }
            }

        }
    }
});

