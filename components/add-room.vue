<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-vue-next';
import { useMutation } from '@vue/apollo-composable';
import { CREATE_ROOM_MUTATION } from '@/lib/graphql/mutations/room';
import { useUserStore } from '@/stores/user';

const title = ref('');
const description = ref('');
const userStore = useUserStore();
const roomsStore = useRoomsStore();

const { mutate: createRoom, onError } = useMutation(CREATE_ROOM_MUTATION);

const handleCreateRoom = async () => {
    try {
        const hostId = userStore.user?.id;
        if (!hostId) {
            console.error('No se pudo obtener el ID del anfitrión');
            return;
        }

        await createRoom({
            createRoomInput: {
                title: title.value,
                description: description.value,
                hostId: hostId,
            },
        });

        onError((error) => {
            console.error('Error al crear la sala:', error);
        });

        title.value = '';
        description.value = '';


    } catch (error) {
        console.error('Error durante la creación de la sala:', error);
    }
};

</script>

<template>
    <div class="mb-4">
        <Dialog>

            <DialogTrigger asChild>
                <Button>
                    <PlusCircle class="mr-2 h-4 w-4" /> Agregar Nueva Sala
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear Nueva Sala</DialogTitle>
                </DialogHeader>

                <div class="space-y-4">
                    <div>
                        <Label for="title">Título</Label>
                        <Input v-model="title" id="title" placeholder="Ingresa el título de la sala" />
                    </div>

                    <div>
                        <Label for="description">Descripción</Label>
                        <Input v-model="description" id="description" placeholder="Ingresa la descripción de la sala" />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="ghost">Cancelar</Button>
                    </DialogClose>
                    <DialogClose as-child>
                        <Button @click="handleCreateRoom">Crear Sala</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
