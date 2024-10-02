export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    if (!userStore.token) {
        return navigateTo('/auth/sign-in');
    }
});
