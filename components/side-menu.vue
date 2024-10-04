<template>
    <div class="h-screen w-64 bg-gray-100 border-r">
        <ScrollArea class="h-full">
            <div class="space-y-4 py-4">
                <div class="px-3 py-2">
                    <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Menu
                    </h2>
                    <div class="space-y-1">
                        <Button asChild variant="ghost" class="w-full justify-start">
                            <NuxtLink to="/diagrammer">
                                <Home class="mr-2 h-4 w-4" />
                                Mis salas
                            </NuxtLink>
                        </Button>
                        <Button asChild variant="ghost" class="w-full justify-start">
                            <NuxtLink to="/diagrammer/shared">
                                <Repeat2 class="mr-2 h-4 w-4" />
                                Salas compartidas
                            </NuxtLink>
                        </Button>
                        <Button asChild variant="ghost" class="w-full justify-start">
                            <NuxtLink to="/diagrammer/invitations">
                                <MailPlus class="mr-2 h-4 w-4" />
                                Invitaciones
                            </NuxtLink>
                        </Button>
                    </div>
                </div>
            </div>
        </ScrollArea>
    </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Home, Repeat2, MailPlus } from 'lucide-vue-next'
</script>