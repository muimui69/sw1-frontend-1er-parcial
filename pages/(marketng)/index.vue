<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
    userStore.checkAuth();
});
</script>
<template>
    <MainNav />
    <HeroSection />
</template>