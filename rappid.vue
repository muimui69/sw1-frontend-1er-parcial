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
import { Table, Link, Herencia, Composicion, Agregacion, Dependencia } from './shapes/app-shapes';

const runtimeConfig = useRuntimeConfig();
const route = useRoute();


let isShapeAdd = false;
let isShapeMove = false;
let isShapeRemove = false;
let isShapeUpdate = false;


// Nuevas variables para manejar enlaces
let isLinkAdd = false;
let isLinkMove = false;
let isLinkRemove = false;
let isLinkUpdate = false;


let socket: Socket;


onMounted(() => {

    const uriSocket = process.env.NODE_ENV === 'production'
        ? runtimeConfig.public.uriSocketProd
        : runtimeConfig.public.uriSocketDev;

    socket = io(uriSocket);

    const roomId = route.params.code;
    console.log("roomID", roomId)

    socket.emit('joinRoom', roomId);

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

    app.graph.on('add', (cell) => {
        if (isShapeAdd || cell.isLink()) return;

        const attrs = cell.get('attrs') || {};
        const headerLabel = attrs['headerLabel'] || {};
        const tabColor = attrs['tabColor'] || {};

        const tableData = {
            id: cell.id,
            name: headerLabel['text'] || '',
            tabColor: tabColor['fill'] || '#FFFFFF',
            position: cell.position(),
            columns: cell.get('columns') || [],
            attrs: cell.get('attrs') || {},
        };

        socket.emit('shape-add', JSON.stringify(tableData));
        console.log('Tabla enviada al servidor:', tableData);
    });

    app.graph.on('add', (cell) => {
        if (isLinkAdd || !cell.isLink()) return;

        const attrs = cell.get('attrs') || {};

        // Obtén los puntos de origen y destino del enlace
        const source = cell.get('source');
        const target = cell.get('target');

        const linkData = {
            id: cell.id,
            type: cell.get('type') || 'Link',
            source: {
                x: source?.x || 0,
                y: source?.y || 0
            },
            target: {
                x: target?.x || 0,
                y: target?.y || 0
            },
            attrs: attrs,
            position: cell.position(),
            size: {
                width: cell.get('size').width || 0,
                height: cell.get('size').height || 0,
            },
            z: cell.get('z'),
        };

        socket.emit('link-add', JSON.stringify(linkData)); // Envía el enlace al servidor
        console.log('Enlace enviado al servidor:', linkData);
    });


    app.graph.on('change:source change:target', (cell) => {
        if (cell.isLink()) {
            // Evita duplicar eventos si ya está en movimiento
            if (isLinkMove) return;

            // Convertir el enlace a JSON y agregar la ID de la sala
            const linkData = cell.toJSON();
            linkData.roomId = roomId;  // Asegurarse de que la ID de la sala está presente

            // Verificación adicional para asegurar que el ID del enlace es válido
            if (!linkData.id) {
                console.error('El enlace no tiene un ID válido para enviar al servidor.');
                return;
            }

            // Emitir el evento al servidor solo si todo es correcto
            isLinkMove = true;  // Evitar reemitir durante el movimiento
            socket.emit('link-update', JSON.stringify(linkData));  // Enviar actualización al servidor
            console.log('Enlace actualizado enviado al servidor:', linkData);

            isLinkMove = false;  // Reiniciar flag después de enviar
        }
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

    app.graph.on('change:position', (cell) => {
        if (isLinkMove) return;  // Evitar emitir el evento si ya se está moviendo

        if (cell.isLink()) {  // Verifica si la celda es un enlace
            const linkData = {
                id: cell.id,
                type: cell.get('type') || 'Link',
                source: cell.get('source'),
                target: cell.get('target'),
                size: {
                    width: cell.get('size').width || 0,
                    height: cell.get('size').height || 0,
                },
                z: cell.get('z'),
                attrs: cell.get('attrs'),
                roomId: roomId, // Incluye la ID de la sala
            };

            socket.emit('link-move', JSON.stringify(linkData));  // Envía los datos al servidor
            console.log('Enlace movido enviado al servidor:', linkData);
        }
    });



    // Evento para eliminar clases (shapes)
    app.graph.on('remove', (cell) => {
        console.log('Evento remove disparado para la celda (clase):', cell.id);
        if (isShapeRemove) return;

        if (cell.isElement()) {  // Verifica si es un elemento (clase)
            socket.emit('shape-remove', JSON.stringify({ id: cell.id }));
            console.log('Forma eliminada enviada al servidor:', cell.id);
        }
    });

    // Evento para eliminar enlaces (links)
    app.graph.on('remove', (cell) => {
        console.log('Evento remove disparado para la celda (enlace):', cell.id);
        if (isLinkRemove) return;

        if (cell.isLink()) {  // Verifica si es un enlace (link)
            socket.emit('link-remove', JSON.stringify({ id: cell.id }));
            console.log('Enlace eliminado enviado al servidor:', cell.id);
        }
    });


    app.graph.on('change:attrs', (cell, attrs) => {
        if (isShapeUpdate) return;

        if (cell.isElement()) {
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

    socket.on('link-add', (linkDataStr) => {
        const linkData = JSON.parse(linkDataStr);  // Parsea los datos JSON
        console.log('Enlace recibido del servidor ::::::::::::::::::::::::::::::::::::::', linkData);

        // Verificar si el enlace ya existe
        const existingLink = app.graph.getCell(linkData.id);
        if (!existingLink) {
            isLinkAdd = true;
            // Crea el enlace en el gráfico
            const link = new Link({
                source: linkData.source,
                target: linkData.target,
                attrs: linkData.attrs,
                size: linkData.size,
                z: linkData.z,
                id: linkData.id
            });

            link.addTo(app.graph);
            isLinkAdd = false;
            console.log('Enlace agregado al gráfico.');
        } else {
            console.log('Enlace ya existe en el gráfico.');
        }
    });



    socket.on('link-remove', (linkDataStr) => {
        const linkData = JSON.parse(linkDataStr);  // Parsear los datos JSON
        console.log('Cliente recibió link-remove:', linkData);

        const link = app.graph.getCell(linkData.id);  // Buscar el enlace por su ID
        if (link) {
            link.remove();  // Eliminar el enlace del gráfico
            console.log('Enlace eliminado del gráfico:', linkData.id);
        } else {
            console.log(`No se encontró el enlace con ID ${linkData.id} para eliminar.`);
        }
    });

    socket.on('link-move', (data) => {
        console.log('Cliente recibió link-move:', data);
        const moveData = JSON.parse(data);

        const link = app.graph.getCell(moveData.id);
        if (link && link.isLink()) {
            console.log('Enlace encontrado para mover:', link);
            isLinkMove = true; // Evita reemitir el evento

            // Actualiza los puntos de origen y destino del enlace
            link.set('source', moveData.source);
            link.set('target', moveData.target);

            console.log('Enlace movido a nuevas posiciones:', moveData.source, moveData.target);
            isLinkMove = false;
        } else {
            console.log(`No se encontró el enlace con ID ${moveData.id} para mover.`);
        }
    });


    // socket.on('link-update', (linkData) => {
    //     console.log('Cliente recibió link-update:', linkData);

    //     // Parsear los datos recibidos
    //     const linkUpdate = JSON.parse(linkData);

    //     // Verificar si el enlace tiene un ID válido
    //     const linkId = linkUpdate.id;
    //     if (!linkId) {
    //         console.error('ID del enlace es indefinido. No se puede proceder con la actualización.');
    //         return;
    //     }

    //     // Buscar el enlace en el gráfico usando el ID
    //     const link = app.graph.getCell(linkId);
    //     if (!link) {
    //         console.error(`No se encontró el enlace con ID ${linkId} para actualizar.`);
    //         return;
    //     }

    //     // Actualizar las propiedades del enlace con los datos recibidos
    //     isLinkMove = true;  // Evitar reemitir durante la actualización

    //     // Actualizar source y target
    //     link.set('source', linkUpdate.source);
    //     link.set('target', linkUpdate.target);

    //     // Actualizar los vértices (si es necesario)
    //     if (linkUpdate.vertices) {
    //         link.set('vertices', linkUpdate.vertices);
    //     }

    //     console.log('Enlace actualizado:', link);

    //     isLinkMove = false;  // Reiniciar el flag después de actualizar
    // });


    socket.on('link-update', (data) => {
        const linkUpdate = JSON.parse(data);
        const linkId = linkUpdate.id; // Asegúrate de extraer el id del enlace desde los datos

        console.log('Cliente recibió link-update:', linkUpdate);

        // Verifica que `linkId` esté definido
        if (!linkId) {
            console.error('ID del enlace es indefinido. No se puede proceder con la actualización.');
            return;
        }

        // Buscar el enlace en el gráfico usando el ID
        const link = app.graph.getCell(linkId);

        if (!link) {
            console.error(`No se encontró el enlace con ID ${linkId} para actualizar.`);
            return;
        }

        // Si el enlace fue encontrado, procede con la actualización
        isLinkMove = true;  // Evitar reemitir durante la actualización

        // Actualizar source y target
        link?.set('source', linkUpdate.source);
        link?.set('target', linkUpdate.target);

        // Actualizar los vértices (si es necesario)
        if (linkUpdate.vertices) {
            link.set('vertices', linkUpdate.vertices);
        }

        console.log('Enlace actualizado:', link);

        isLinkMove = false;  // Reiniciar el flag después de actualizar
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
