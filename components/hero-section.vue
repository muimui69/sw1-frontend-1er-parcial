<template>
    <section class="w-full py-24 bg-white">
        <div class="container mx-auto px-4 md:px-6">
            <div class="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
                <div class="text-gray-800">
                    <h1 class="text-5xl font-bold tracking-tighter">Visualiza tus clases con ClassCraft</h1>
                    <p class="mt-4 text-lg max-w-lg">
                        Cree, edite y comparta hermosos diagramas de clases sin esfuerzo. Optimice su proceso de diseño
                        de software
                        con nuestra intuitiva herramienta de diagramación.
                    </p>
                    <nuxt-link to="/auth/sign-in"
                        class="mt-6 inline-block bg-purple-500 text-gray-800 py-2 px-4 rounded hover:bg-purple-600 transition">
                        Empezar a diagramar
                    </nuxt-link>
                </div>
                <div class="flex justify-center">
                    <NuxtImg src="/home.png" alt="Class Diagram Example"
                        class="w-full h-full object-cover rounded-xl" />
                </div>
            </div>
        </div>
    </section>
</template>
