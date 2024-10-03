<template>
    <div class="h-screen w-full flex">
        <aside class="w-64 bg-gray-900 text-white">
            <nav>
                <ul>
                    <li>
                        <NuxtLink to="/diagrammer">Mis salas</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/diagrammer/shared">Salas compartidas</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/diagrammer/invitations">Invitaciones</NuxtLink>
                    </li>
                </ul>
            </nav>
        </aside>

        <main class="w-3/4 p-20">
            <NuxtPage />
        </main>
    </div>
</template>