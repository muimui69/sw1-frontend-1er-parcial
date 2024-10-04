// // socket.ts

// import { Socket } from 'socket.io-client';
// import { dia } from '../build/package/joint-plus';
// import KitchenSinkService from './kitchensink-service';

// export function setupSocketIntegration(
//     app: KitchenSinkService,
//     socket: Socket,
//     roomId: string
// ) {
//     const graph = app.graph;

//     graph.on('add change:position remove', (cell, options) => {
//         if (options.remote) return;

//         const eventName = options.graph ? 'batch' : options.event || 'unknown';
//         const event = {
//             eventName,
//             cell: cell.toJSON(),
//             options,
//         };

//         socket.emit('diagram-event', { roomId, event });
//     });

//     // Escuchar eventos del servidor
//     socket.on('diagram-event', (data: any) => {
//         const { eventName, cell, options } = data;

//         // Aplicar cambios al grafo local
//         switch (eventName) {
//             case 'add':
//                 if (!graph.getCell(cell.id)) {
//                     graph.addCell(cell, { remote: true });
//                 }
//                 break;
//             case 'change:position':
//                 const localCell = graph.getCell(cell.id);
//                 if (localCell) {
//                     localCell.set(cell.position.x, cell.position.y, { remote: true });
//                 }
//                 break;
//             case 'remove':
//                 graph.getCell(cell.id)?.remove({ remote: true });
//                 break;
//             // Manejar otros eventos si es necesario
//         }
//     });
// }
