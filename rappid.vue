<template>
    <div class="joint-app joint-theme-modern" ref="app">
        <div class="app-header">
            <div class="app-title">
                <h1>JointJS+</h1>
            </div>
            <div class="toolbar-container" />
        </div>
        <div class="app-body">
            <div class="stencil-container" />
            <div class="paper-container" />
            <div class="inspector-container" />
            <div class="navigator-container" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Importar servicios de Rappid
import RappidService from "./services/kitchensink-service";
import { StencilService } from "./services/stencil-service";
import { ToolbarService } from "./services/toolbar-service";
import { InspectorService } from "./services/inspector-service";
import { HaloService } from "./services/halo-service";
import { KeyboardService } from "./services/keyboard-service";
import { ThemePicker } from "./components/theme-picker";
import { sampleGraphs } from './config/sample-graphs';

// Definir la referencia del contenedor app
const app = ref<HTMLElement | null>(null);
let rappid: RappidService | null = null;
onMounted(() => {
    // Inicializar el servicio Rappid
    rappid = new RappidService(
        app.value!,
        new StencilService(),
        new ToolbarService(),
        new InspectorService(),
        new HaloService(),
        new KeyboardService()
    );

    // Iniciar Rappid
    rappid.startRappid();

    // Añadir el selector de temas
    const themePicker = new ThemePicker({ mainView: rappid });
    document.body.appendChild(themePicker.render().el);

    // Cargar un diagrama de ejemplo
    rappid.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));
});
</script>

<style lang="scss">
/* Importar estilos de Rappid */
@import "@joint/plus/joint-plus.css";
@import "./css/style.css";
@import "./css/theme-picker.css";
@import "./css/style.modern.css";
@import "./css/style.dark.css";
@import "./css/style.material.css";
</style>
