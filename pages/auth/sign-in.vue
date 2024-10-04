<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { LOGIN_MUTATION } from '@/lib/graphql/mutations/user';

const email = ref('');
const password = ref('');
const router = useRouter();
const userStore = useUserStore();

const { mutate: login, onDone, onError } = useMutation(LOGIN_MUTATION);

const handleLogin = async () => {
    await login({
        loginInput: {
            email: email.value,
            password: password.value
        }
    });

    onDone(({ data }) => {
        const { token, user } = data.login;
        userStore.setUser(user, token);
        router.push('/diagrammer');
    });

    onError((error) => {
        console.error('Error durante el login:', error);
    });
};
</script>


<template>
    <section class="w-full min-h-screen flex items-center justify-center bg-gray-50 relative">

        <NuxtLink to="/" class="absolute top-4 left-4  p-4 inline-flex items-center text-gray-700 hover:underline">
            <ChevronLeft class="h-6 w-6" />
            Volver al inicio
        </NuxtLink>

        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <h2 class="text-center text-2xl font-bold text-gray-800 mb-6">Iniciar sesión</h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Correo electrónico
                    </label>
                    <input v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" placeholder="Ingresa tu correo">
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Contraseña
                    </label>
                    <input v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="********">
                </div>

                <div class="flex items-center justify-between">
                    <Button
                        class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                        type="submit">
                        Iniciar sesión
                    </Button>
                </div>
            </form>

            <div class="mt-6 text-center">
                <p class="text-gray-600">¿No tiene una cuenta?
                    <NuxtLink to="/auth/sign-up" class="text-purple-500 hover:underline">Regístrese</NuxtLink>
                </p>
            </div>
        </div>
    </section>
</template>
