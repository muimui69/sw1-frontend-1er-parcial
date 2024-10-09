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
import type { User } from '@/lib/graphql/interface/user';

const userStore = useUserStore();
const roomstore = useRoomsStore();

watch(
    () => userStore.user as User,
    (newUser) => {
        if (newUser?.id) {
            roomstore.fetchInvitationsByHost(newUser.id);
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
        roomstore.fetchInvitationsByHost(userId);
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
                <h1 class="text-4xl font-bold mb-10">Mis Invitaciones</h1>

                <AddInvitation />

                <div class="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Correo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead class="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <template v-if="!roomstore.loading">
                                <TableRow v-for="invite in roomstore.invitations" :key="invite.id">
                                    <TableCell class="font-medium">{{ invite.email }}</TableCell>
                                    <TableCell>{{ invite.status === 'PENDING' ? 'Pendiente' : 'Aceptada' }}</TableCell>
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
                                                    <NuxtLink :to="`/diagrammer/invite/${invite.id}`">
                                                        Ver detalles
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
                                    <TableCell colspan="3" class="text-center">Cargando invitaciones...</TableCell>
                                </TableRow>
                            </template>

                            <template v-if="!roomstore.loading && !roomstore.invitations?.length">
                                <TableRow>
                                    <TableCell colspan="3" class="text-center">No hay invitaciones.</TableCell>
                                </TableRow>
                            </template>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    </client-only>
</template>
