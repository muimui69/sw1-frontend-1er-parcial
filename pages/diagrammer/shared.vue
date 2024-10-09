<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Users } from 'lucide-vue-next';
import { useUserStore } from '@/stores/user';
import { useRoomsStore } from '@/stores/room';
import type { User } from '@/lib/graphql/interface/user';

const userStore = useUserStore();
const roomsStore = useRoomsStore();

watch(
    () => userStore.user as User,
    (newUser) => {
        if (newUser?.id) {
            roomsStore.fetchSharedRooms(newUser.id); // Llamamos al store para cargar las salas compartidas
        }
    },
    { immediate: true }
);

onMounted(() => {
    if (!userStore.user) {
        userStore.loadToken();
    }
    const userId = (userStore.user as User)?.id;
    if (userId) {
        roomsStore.fetchSharedRooms(userId); // Cargamos las salas compartidas al montar si el userId está disponible
    }
});

definePageMeta({
    layout: "diagrammer",
});
</script>

<template>
    <client-only>
        <div class="w-full py-24">
            <div class="container mx-auto px-4 md:px-6">
                <h1 class="text-4xl font-bold mb-10">Salas compartidas</h1>

                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Participantes</TableHead>
                                <TableHead>Anfitrion</TableHead>
                                <TableHead class="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <template v-if="!roomsStore.loading">
                                <TableRow v-for="room in roomsStore.sharedRooms" :key="room.id">
                                    <TableCell class="font-medium">{{ room.title }}</TableCell>
                                    <TableCell>{{ room.isOpen ? 'Sala abierta' : 'Sala cerrada' }}</TableCell>
                                    <TableCell>
                                        <ul>
                                            <li v-for="participant in room.participants" :key="participant.user.email">
                                                {{ participant.user.email }} - Rol: {{ participant.role }}
                                            </li>
                                        </ul>
                                    </TableCell>
                                    <TableCell>{{ room.host.email }}</TableCell>
                                    <TableCell class="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Button variant="ghost" class="h-8 w-8 p-0">
                                                    <span class="sr-only">Abrir menú</span>
                                                    <MoreHorizontal class="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Pencil class="mr-2 h-4 w-4" /> Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Users class="mr-2 h-4 w-4" />
                                                    <NuxtLink :to="`/diagrammer/room/${room.code}`">
                                                        Ir a sala
                                                    </NuxtLink>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Trash2 class="mr-2 h-4 w-4" /> Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </template>

                            <template v-else>
                                <TableRow>
                                    <TableCell colspan="4" class="text-center">Cargando salas...</TableCell>
                                </TableRow>
                            </template>

                            <template v-if="!roomsStore.loading && !roomsStore.sharedRooms?.length">
                                <TableRow>
                                    <TableCell colspan="4" class="text-center">No hay salas compartidas.</TableCell>
                                </TableRow>
                            </template>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </client-only>
</template>
