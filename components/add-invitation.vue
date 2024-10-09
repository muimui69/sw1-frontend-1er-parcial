<script setup lang="ts">
import { ref } from "vue"
import { PlusCircle, X } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRoomsStore } from '@/stores/room'
import { useUserStore } from '@/stores/user'
import { useMutation } from "@vue/apollo-composable"
import { INVITE_TO_ROOM_MUTATION } from "@/lib/graphql/mutations/room"

const roomsStore = useRoomsStore()
const userStore = useUserStore()

const selectedRoom = ref("")
const emails = ref<string[]>([])
const currentEmail = ref("")

const { mutate: addCollaborators, onError } = useMutation(INVITE_TO_ROOM_MUTATION);


const handleAddEmail = () => {
    if (currentEmail.value && !emails.value.includes(currentEmail.value)) {
        emails.value.push(currentEmail.value)
        currentEmail.value = ""
    }
}

const handleRemoveEmail = (email: string) => {
    emails.value = emails.value.filter((e) => e !== email)
}


const handleSendInvitations = async () => {
    try {
        const roomId = selectedRoom.value;
        if (!roomId) {
            console.error('No se seleccionó una sala.');
            return;
        }

        if (emails.value.length === 0) {
            console.error('No se han agregado correos electrónicos para las invitaciones.');
            return;
        }

        await addCollaborators({
            roomId: roomId,
            emails: emails.value
        });

        onError((error) => {
            console.error('Error al enviar invitaciones:', error);
        });

        console.log('Invitaciones enviadas con éxito.');

        selectedRoom.value = "";
        emails.value = [];

    } catch (error) {
        console.error('Error durante el envío de invitaciones:', error);
    }
};


onMounted(() => {
    if (!roomsStore.rooms && userStore.user) {
        roomsStore.fetchRoomsByUser(userStore.user.id)
    }
})

</script>

<template>
    <div class="mb-4">
        <client-only>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle class="mr-2 h-4 w-4" /> Enviar invitaciones
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enviar Invitaciones</DialogTitle>
                        <DialogDescription>
                            Selecciona una sala y agrega los correos electrónicos para enviar las invitaciones.
                        </DialogDescription>
                    </DialogHeader>
                    <div class="flex flex-col space-y-4 py-4">
                        <div class="flex flex-col space-y-2">
                            <Label htmlFor="room">Sala</Label>
                            <Select v-model="selectedRoom">
                                <SelectTrigger id="room">
                                    <SelectValue placeholder="Selecciona una sala" />
                                </SelectTrigger>
                                <SelectContent>
                                    <template v-if="!roomsStore.loading && roomsStore.rooms">
                                        <SelectItem v-for="room in roomsStore.rooms" :key="room.id" :value="room.id">
                                            {{ room.title }}
                                        </SelectItem>
                                    </template>
                                    <template v-else>
                                        <SelectItem value="" disabled>Cargando salas...</SelectItem>
                                    </template>
                                </SelectContent>
                            </Select>
                        </div>

                        <!-- Agregar Correo -->
                        <div class="flex flex-col space-y-2">
                            <Label htmlFor="email">Correo</Label>
                            <div class="flex space-x-2">
                                <Input id="email" v-model="currentEmail" placeholder="ejemplo@correo.com" />
                                <Button type="button" @click="handleAddEmail">
                                    Agregar
                                </Button>
                            </div>
                        </div>

                        <!-- Lista de Correos Agregados -->
                        <div class="space-y-2">
                            <div v-for="email in emails" :key="email"
                                class="flex items-center justify-between bg-secondary p-2 rounded">
                                <span class="text-sm">{{ email }}</span>
                                <Button variant="ghost" size="sm" @click="handleRemoveEmail(email)">
                                    <X class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose as-child>
                            <Button variant="ghost">Cancelar</Button>
                        </DialogClose>

                        <DialogClose as-child>
                            <Button type="submit" @click="handleSendInvitations">
                                Enviar Invitaciones
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </client-only>
    </div>
</template>
