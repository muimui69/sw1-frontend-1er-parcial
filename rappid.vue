<template>
    <div class="joint-app joint-theme-modern" ref="app">
        <div class="app-header">
            <div class="app-title">
                <h1>ClassCraft</h1>
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

import { StencilService } from "./services/stencil-service";
import { ToolbarService } from "./services/toolbar-service";
import { InspectorService } from "./services/inspector-service";
import { HaloService } from "./services/halo-service";
import { KeyboardService } from "./services/keyboard-service";
import { ThemePicker } from "./components/theme-picker";
import KitchenSinkService from './services/kitchensink-service';
import { io, Socket } from 'socket.io-client';
// import { setupSocketIntegration } from './services/socket';
import { Table } from './shapes/app-shapes';

const appRef = ref<HTMLElement | null>(null);
let socket: Socket;

let isShapeAdd = false;
let isShapeMove = false;
let isShapeRemove = false;
let isShapeUpdate = false;

onMounted(() => {
    socket = io('http://localhost:4000');

    // const roomId = '53b2c98c-0649-4945-8e9e-8afba6edaf48';
    // socket.emit('join-room', roomId);

    const app = new KitchenSinkService(
        document.getElementById('app')!,
        new StencilService(),
        new ToolbarService(),
        new InspectorService(),
        new HaloService(),
        new KeyboardService()
    );

    app.startRappid();

    const themePicker = new ThemePicker({ mainView: app });
    document.body.appendChild(themePicker.render().el);

    // app.graph.on('add', (cell) => {
    //     console.log('Celda añadida:', cell);

    //     if (isShapeAdd) return;

    //     const tableData = {
    //         id: cell.id,
    //         name: cell.get('attrs')['headerLabel']['text'] || '',
    //         tabColor: cell.get('attrs')['tabColor']['fill'] || '#FFFFFF',
    //         position: cell.position(),
    //         columns: cell.get('columns') || [],
    //     };

    //     socket.emit('shape-add', JSON.stringify(tableData));
    //     console.log('Tabla enviada al servidor:', tableData);
    // });

    // app.graph.on('add', (cell) => {
    //     if (isShapeAdd) return;

    //     const attrs = cell.get('attrs') || {};
    //     const headerLabel = attrs['headerLabel'] || {};
    //     const tabColor = attrs['tabColor'] || {};

    //     const tableData = {
    //         id: cell.id,
    //         name: headerLabel['text'] || '',
    //         tabColor: tabColor['fill'] || '#FFFFFF',
    //         position: cell.position(),
    //         columns: cell.get('columns') || [],
    //     };

    //     socket.emit('shape-add', JSON.stringify(tableData));
    //     console.log('Tabla enviada al servidor:', tableData);
    // });


    app.graph.on('add', (cell) => {
        if (isShapeAdd) return;

        const attrs = cell.get('attrs') || {};
        const headerLabel = attrs['headerLabel'] || {};
        const tabColor = attrs['tabColor'] || {};

        const tableData = {
            id: cell.id,
            name: headerLabel['text'] || '',
            tabColor: tabColor['fill'] || '#FFFFFF',
            position: cell.position(),
            columns: cell.get('columns') || [],
            attrs: cell.get('attrs') || {}, // Incluimos todos los atributos
        };

        socket.emit('shape-add', JSON.stringify(tableData));
        console.log('Tabla enviada al servidor:', tableData);
    });


    // Evento 'change:position'
    app.graph.on('change:position', (cell) => {
        console.log('Evento change:position disparado para la celda:', cell.id);
        if (isShapeMove) return;

        const moveData = {
            id: cell.id,
            position: cell.position(),
        };

        socket.emit('shape-move', JSON.stringify(moveData));
        console.log('Movimiento de forma enviado al servidor:', moveData);
    });


    app.graph.on('remove', (cell) => {
        console.log('Evento remove disparado para la celda:', cell.id);
        if (isShapeRemove) return;

        if (cell.isElement()) {
            socket.emit('shape-remove', JSON.stringify({ id: cell.id }));
            console.log('Forma eliminada enviada al servidor:', cell.id);
        }
    });

    app.graph.on('change:attrs', (cell, attrs) => {
        if (isShapeUpdate) return;

        if (cell.isElement()) {
            // Verificamos si el nombre ha cambiado
            if (cell.hasChanged('attrs/headerLabel/text')) {
                const updateData = {
                    id: cell.id,
                    name: cell.attr('headerLabel/text'),
                };

                console.log('Nombre de la tabla cambiado:', updateData);
                socket.emit('shape-update', updateData);
            }
        }
    });


    app.graph.on('change:columns', (cell) => {
        if (isShapeUpdate) return;

        if (cell.isElement()) {
            const updateData = {
                id: cell.id,
                columns: cell.get('columns'),
            };

            console.log('Atributos de la tabla cambiados:', updateData);
            socket.emit('shape-update', updateData);
        }
    });



    // // Recepción de 'shape-add'
    // socket.on('shape-add', (data) => {
    //     const shapeData = JSON.parse(data);

    //     if (!app.graph.getCell(shapeData.id)) {
    //         isShapeAdd = true;  // Evita reemitir el evento desde el cliente
    //         const table = new Table({ id: shapeData.id })  // Establece el mismo ID
    //             .setName(shapeData.name)
    //             .setTabColor(shapeData.tabColor)
    //             .position(shapeData.position.x, shapeData.position.y)
    //             .setColumns(shapeData.columns)
    //             .addTo(app.graph);

    //         console.log("Forma añadida desde el servidor:", shapeData, table);
    //         isShapeAdd = false;  // Resetea la bandera
    //     } else {
    //         console.log(`Forma con ID ${shapeData.id} ya existe.`);
    //     }
    // });

    socket.on('shape-add', (data) => {
        const shapeData = JSON.parse(data);

        if (!app.graph.getCell(shapeData.id)) {
            isShapeAdd = true;

            const table = new Table({
                id: shapeData.id,
                attrs: {
                    headerLabel: {
                        text: shapeData.name || '',
                        fill: '#636363',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                    },
                    tabColor: {
                        fill: shapeData.tabColor || '#6C6C6C',
                    },
                    // Agrega otros atributos necesarios aquí
                },
                position: shapeData.position,
                columns: shapeData.columns || [],
            });

            table.addTo(app.graph);

            console.log('Tabla añadida desde el servidor:', table);
            isShapeAdd = false;
        } else {
            console.log(`Tabla con ID ${shapeData.id} ya existe.`);
        }
    });


    socket.on('shape-remove', (data) => {
        console.log('Cliente recibió shape-remove:', data);
        const removeData = JSON.parse(data);

        const cell = app.graph.getCell(removeData.id);
        if (cell) {
            console.log('Forma encontrada para eliminar:', cell);
            isShapeRemove = true; // Evita reemitir el evento desde el cliente
            cell.remove();
            console.log('Forma eliminada desde el servidor:', removeData.id);
            isShapeRemove = false;
        } else {
            console.log(`No se encontró la forma con ID ${removeData.id} para eliminar.`);
        }
    });

    socket.on('shape-move', (data) => {
        console.log('Cliente recibió shape-move:', data);
        const moveData = JSON.parse(data);
        console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;", data)

        const cell = app.graph.getCell(moveData.id);
        if (cell) {
            console.log('Forma encontrada para mover:', cell);
            isShapeMove = true; // Evita reemitir el evento
            cell.set('position', { x: moveData.position.x, y: moveData.position.y });
            console.log('Forma movida a la posición:', moveData.position);
            isShapeMove = false;
        } else {
            console.log(`No se encontró la forma con ID ${moveData.id} para mover.`);
        }
    });


    // Recepción de 'shape-update'
    socket.on('shape-update', (data) => {
        console.log('Cliente recibió shape-update:', data);
        const cell = app.graph.getCell(data.id);

        if (cell) {
            isShapeUpdate = true; // Evita reemitir el evento

            if (data.name !== undefined) {
                cell.attr('headerLabel/text', data.name);
                console.log('Nombre de la tabla actualizado a:', data.name);
            }

            if (data.columns !== undefined) {
                cell.set('columns', data.columns);
                cell.trigger('change:columns'); // Forzar el disparo del evento de cambio
                console.log('Atributos de la tabla actualizados a:', data.columns);
            }


            isShapeUpdate = false;
        } else {
            console.log(`No se encontró la forma con ID ${data.id} para actualizar.`);
        }
    });



});
</script>

<style lang="scss">
@import "/build/package/joint-plus.css";
@import "./css/style.css";
@import "./css/theme-picker.css";
@import "./css/style.modern.css";
@import "./css/style.dark.css";
@import "./css/style.material.css";
</style>
