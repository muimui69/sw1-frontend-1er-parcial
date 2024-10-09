/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

 2024-10-01 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


// import { ui, dia } from '@joint/plus';
import { ui, dia } from '../build/package/joint-plus';
import * as appShapes from '../shapes/app-shapes';

export class StencilService {

    stencil: ui.Stencil | undefined;

    create(paperScroller: ui.PaperScroller, snaplines: ui.Snaplines) {

        this.stencil = new ui.Stencil({
            paper: paperScroller,
            snaplines: snaplines,
            width: 250,
            groups: this.getStencilGroups(),
            dropAnimation: true,
            groupsToggleButtons: true,
            paperOptions: function () {
                return {
                    model: new dia.Graph({}, {
                        cellNamespace: appShapes
                    }),
                    cellViewNamespace: appShapes
                };
            },
            search: {
                '*': ['type', 'attrs/root/dataTooltip', 'attrs/label/text']
            },
            layout: {
                columns: 1,
                marginX: 10,
                marginY: 10,  // Ajusta este valor para aumentar el espacio vertical entre los elementos
                columnGap: 20,
                columnWidth: 100,
                rowHeight: 100,  // Ajusta este valor para aumentar el tamaño de las filas
            },


            dragStartClone: (cell: dia.Cell) => cell.clone().removeAttr('root/dataTooltip')
        });
    }

    setShapes() {
        if (this.stencil) {
            this.stencil.load(this.getStencilShapes());
        }
    }

    getStencilGroups() {
        return <{ [key: string]: ui.Stencil.Group }>{
            uml: { index: 1, label: 'UML Objects' },
        };
    }

    getStencilShapes() {
        return {
            uml: [
                {
                    type: 'Table',
                    columns: [{ name: 'attribute name', type: 'int', key: true }] as any[],
                    padding: { top: 40, bottom: 10, left: 10, right: 10 },
                    size: { width: 260 },
                    itemMinLabelWidth: 80,
                    itemHeight: 25,
                    itemOffset: 0,
                    itemOverflow: true,
                    attrs: {
                        root: {
                            magnet: false
                        },
                        body: {
                            stroke: '#FFF',
                            fill: '#FFF',
                            strokeWidth: 1
                        },
                        tabColor: {
                            x: -1,
                            y: -5,
                            width: 'calc(w+2)',
                            height: 5,
                            stroke: 'none',
                            fill: '#6C6C6C',
                            strokeWidth: 1
                        },
                        header: {
                            fill: '#F8FAFC',
                            stroke: '#F8FAFC',
                            strokeWidth: 1,
                        },
                        headerLabel: {
                            text: 'Default Name',
                            fill: '#636363',
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',
                            textWrap: {
                                ellipsis: true,
                                height: 30
                            }
                        },
                        itemBodies_0: {
                            // SVGRect which is an active magnet
                            // Do not use `true` to prevent CSS effects on hover
                            magnet: 'item'
                        },
                        group_1: {
                            // let the pointer events propagate to the group_0
                            // which spans over 2 columns
                            pointerEvents: 'none'
                        },
                        itemLabels: {
                            fontFamily: 'sans-serif',
                            fill: '#636363',
                            pointerEvents: 'none'
                        },
                        itemLabels_1: {
                            fill: '#9C9C9C',
                            textAnchor: 'end',
                            x: 'calc(0.5 * w - 10)'
                        },
                        itemLabels_keys: {
                            x: 'calc(0.5 * w - 30)'
                        },
                        iconsGroup_1: {
                            // SVGGroup does not accept `x` attribute
                            refX: '50%',
                            refX2: -26
                        }
                    }
                },
                {
                    type: 'LinkStencilHerencia',
                    markup: [
                        {
                            tagName: 'path',
                            selector: 'line',
                            attributes: {
                                fill: 'none',
                                stroke: '#A0A0A0',
                                'stroke-width': 2,
                                d: 'M 0 0 L 120 0'
                            }
                        },
                        {
                            tagName: 'path',
                            selector: 'targetMarker',
                            attributes: {
                                fill: 'white',
                                stroke: '#A0A0A0',
                                d: 'M 120 -16 150 0 120 16 Z'
                            }
                        }
                    ]
                },
                {
                    type: 'LinkStencilAgregacion',  // Representación para el link de agregación
                    markup: [
                        {
                            tagName: 'path',
                            selector: 'line',
                            attributes: {
                                fill: 'none',
                                stroke: '#A0A0A0',   // Color de la línea
                                'stroke-width': 2,    // Grosor de la línea
                                d: 'M 0 0 L 120 0'    // Dibuja la línea horizontalmente
                            }
                        },
                        {
                            tagName: 'path',
                            selector: 'targetMarker',
                            attributes: {
                                fill: 'white',
                                stroke: '#A0A0A0',
                                d: 'M 120 -16 L 135 0 L 120 16 L 105 0 Z'  // Relleno vacío para agregación (rombo)
                            }
                        }
                    ]
                },
                {
                    type: 'LinkStencilComposicion',  // Representación para el link de composición
                    markup: [
                        {
                            tagName: 'path',
                            selector: 'line',
                            attributes: {
                                fill: 'none',
                                stroke: '#A0A0A0',   // Color de la línea
                                'stroke-width': 2,    // Grosor de la línea
                                d: 'M 0 0 L 120 0'    // Dibuja la línea horizontalmente
                            }
                        },
                        {
                            tagName: 'path',
                            selector: 'targetMarker',
                            attributes: {
                                fill: '#A0A0A0',  // Lleno para composición
                                stroke: '#A0A0A0',
                                d: 'M 120 -16 L 135 0 L 120 16 L 105 0 Z'  // Relleno lleno para composición (rombo)
                            }
                        }
                    ]
                },
                {
                    type: 'LinkStencilDependencia',  // Representación para el link de dependencia
                    markup: [
                        {
                            tagName: 'path',
                            selector: 'line',
                            attributes: {
                                fill: 'none',
                                stroke: '#A0A0A0',   // Color de la línea
                                'stroke-width': 2,    // Grosor de la línea
                                'stroke-dasharray': '5, 5',  // Línea discontinua para dependencia
                                d: 'M 0 0 L 120 0'    // Dibuja la línea horizontalmente
                            }
                        },
                        {
                            tagName: 'path',
                            selector: 'targetMarker',
                            attributes: {
                                fill: 'none',  // Flecha abierta
                                stroke: '#A0A0A0',
                                d: 'M 120 -16 L 150 0 L 120 16'  // Flecha abierta para dependencia
                            }
                        }
                    ]
                }
            ],

        };
    }
}
