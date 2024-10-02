<script setup="ts">
import { Pyramid, Menu, User } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const handleSignInOut = () => {
    if (userStore.isSignedIn) {
        userStore.logout();
    } else {
        // Redirigir a la página de inicio de sesión
    }
};

// const isMobileMenuOpen = ref(false)
const config = useRuntimeConfig(); // Acceder a las variables de configuración
const appName = config.public.appName; // Obtener el nombre de la aplicación

</script>


<template>
    <header
        class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center">
            <div class="mr-4 flex">
                <nuxt-link to="/" class="mr-6 flex items-center space-x-2">
                    <Pyramid class="h-6 w-6" />
                    <span class="hidden font-bold sm:inline-block">{{ appName }}</span>
                </nuxt-link>
                <!-- <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <nuxt-link v-for="item in mainNavConfig.mainNav" :key="item.href" :to="item.href"
                        class="transition-colors hover:text-foreground/80 text-foreground/60">
                        {{ item.title }}
                    </nuxt-link>
                </nav> -->
            </div>
            <div class="flex flex-1 items-center justify-end space-x-2">
                <nav class="flex items-center">
                    <DropdownMenu v-if="isSignedIn">
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                                <User class="h-5 w-5" />
                                <span class="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <nuxt-link to="/profile">Profile</nuxt-link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <nuxt-link to="/settings">Settings</nuxt-link>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="handleSignInOut">Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" class="hidden md:inline-flex" @click="handleSignInOut">
                        <NuxtLink to="/auth/sign-in"> {{ userStore.isSignedIn ? 'Cerrar sesión' : 'Iniciar sesión' }}
                        </NuxtLink>
                    </Button>

                </nav>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost"
                        class="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                        <Menu class="h-6 w-6" />
                        <span class="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" class="w-[300px] sm:w-[400px]">
                    <nav class="flex flex-col space-y-4 mt-4">
                        <!-- <NavItems /> -->
                        <Button v-if="!isSignedIn" @click="handleSignInOut" variant="ghost"
                            class="justify-start">Iniciar sesion</Button>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    </header>
</template>
