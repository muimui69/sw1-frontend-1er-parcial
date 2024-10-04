/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

 2024-10-01 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


// import * as joint from '@joint/plus';
import * as joint from '../build/package/joint-plus';


export class InspectorService {

    create(cell: joint.dia.Cell): joint.ui.Inspector | null {
        var config = this.getInspectorConfig()[cell.get('type')];

        // Verificar si existe una configuración para el tipo de celda
        if (!config) {
            console.warn("Inspector for cell type ".concat(cell.get('type'), " not found."));
            return null;
        }

        // Verificar si `inputs` y `groups` están definidos
        if (!config.inputs || !config.groups) {
            console.warn("Inspector config for cell type ".concat(cell.get('type'), " is invalid."));
            return null;
        }

        const inspector = new joint.ui.Inspector({
            cell: cell,
            inputs: config.inputs,
            groups: config.groups
        });

        inspector.render();

        if (!config) {
            console.warn(`Inspector for cell type ${cell.get('type')} not found.`);
            return null;
        }
        const { groups, inputs } = this.getInspectorConfig()[cell.get('type')];
        if (!groups || !inputs) {
            console.warn(`Inspector config for cell type ${cell.get('type')} is invalid.`);
            return null;
        }

        return joint.ui.Inspector.create('.inspector-container', { cell, groups, inputs });
    }

    getInspectorConfig() {

        const options = {

            colorPalette: [
                { content: 'transparent', icon: '/assets/transparent-icon.svg' },
                { content: '#f6f6f6' },
                { content: '#dcd7d7' },
                { content: '#8f8f8f' },
                { content: '#c6c7e2' },
                { content: '#feb663' },
                { content: '#fe854f' },
                { content: '#b75d32' },
                { content: '#31d0c6' },
                { content: '#7c68fc' },
                { content: '#61549c' },
                { content: '#6a6c8a' },
                { content: '#4b4a67' },
                { content: '#3c4260' },
                { content: '#33334e' },
                { content: '#222138' }
            ],

            colorPaletteReset: [
                { content: <string><unknown>undefined, icon: '/assets/no-color-icon.svg' },
                { content: '#f6f6f6' },
                { content: '#dcd7d7' },
                { content: '#8f8f8f' },
                { content: '#c6c7e2' },
                { content: '#feb663' },
                { content: '#fe854f' },
                { content: '#b75d32' },
                { content: '#31d0c6' },
                { content: '#7c68fc' },
                { content: '#61549c' },
                { content: '#6a6c8a' },
                { content: '#4b4a67' },
                { content: '#3c4260' },
                { content: '#33334e' },
                { content: '#222138' }
            ],

            fontWeight: [
                { value: '300', content: '<span style="font-weight: 300">Light</span>' },
                { value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
                { value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
            ],

            fontFamily: [
                { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
                { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
                { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
            ],

            strokeStyle: [
                { value: '0', content: 'Solid' },
                { value: '2,5', content: 'Dotted' },
                { value: '10,5', content: 'Dashed' }
            ],

            side: [
                { value: 'top', content: 'Top Side' },
                { value: 'right', content: 'Right Side' },
                { value: 'bottom', content: 'Bottom Side' },
                { value: 'left', content: 'Left Side' }
            ],

            portLabelPositionRectangle: [
                { value: { name: 'top', args: { y: -12 } }, content: 'Above' },
                { value: { name: 'right', args: { y: 0 } }, content: 'On Right' },
                { value: { name: 'bottom', args: { y: 12 } }, content: 'Below' },
                { value: { name: 'left', args: { y: 0 } }, content: 'On Left' }
            ],

            portLabelPositionEllipse: [
                { value: 'radial', content: 'Horizontal' },
                { value: 'radialOriented', content: 'Angled' }
            ],

            imageIcons: [
                { value: '/assets/image-icon1.svg', content: '<img height="42px" src="assets/image-icon1.svg"/>' },
                { value: '/assets/image-icon2.svg', content: '<img height="80px" src="assets/image-icon2.svg"/>' },
                { value: '/assets/image-icon3.svg', content: '<img height="80px" src="assets/image-icon3.svg"/>' },
                { value: '/assets/image-icon4.svg', content: '<img height="80px" src="assets/image-icon4.svg"/>' }
            ],

            imageGender: [
                { value: '/assets/member-male.png', content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
                { value: '/assets/member-female.png', content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
            ],

            arrowheadSize: [
                { value: 'M 0 0 0 0', content: 'None' },
                { value: 'M 0 -3 -6 0 0 3 z', content: 'Small' },
                { value: 'M 0 -5 -10 0 0 5 z', content: 'Medium' },
                { value: 'M 0 -10 -15 0 0 10 z', content: 'Large' },
            ],

            strokeWidth: [
                { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
                { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
                { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
                { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
            ],

            router: [
                { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
                { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
                { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
            ],

            connector: [
                { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
                { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
                { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
            ],

            labelPosition: [
                { value: 30, content: 'Close to source' },
                { value: 0.5, content: 'In the middle' },
                { value: -30, content: 'Close to target' },
            ],

            portMarkup: [{
                value: [{
                    tagName: 'rect',
                    selector: 'portBody',
                    attributes: {
                        'width': 20,
                        'height': 20,
                        'x': -10,
                        'y': -10
                    }
                }],
                content: 'Rectangle'
            }, {
                value: [{
                    tagName: 'circle',
                    selector: 'portBody',
                    attributes: {
                        'r': 10
                    }
                }],
                content: 'Circle'
            }, {
                value: [{
                    tagName: 'path',
                    selector: 'portBody',
                    attributes: {
                        'd': 'M -10 -10 10 -10 0 10 z'
                    }
                }],
                content: 'Triangle'
            }]
        };

        return <{ [index: string]: any }>{

            'Link': {
                inputs: {
                    attrs: {
                        line: {
                            strokeWidth: {
                                type: 'select-button-group',
                                options: options.strokeWidth,
                                group: 'connection',
                                label: 'Link thickness',
                                when: { ne: { 'attrs/line/stroke': 'transparent' } },
                                index: 4
                            },
                            strokeDasharray: {
                                type: 'select-box',
                                options: options.strokeStyle,
                                group: 'connection',
                                label: 'Link style',
                                when: { ne: { 'attrs/line/stroke': 'transparent' } },
                                index: 5
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                group: 'connection',
                                label: 'Color',
                                index: 6
                            },
                            sourceMarker: {
                                d: {
                                    type: 'select-box',
                                    options: options.arrowheadSize,
                                    group: 'marker-source',
                                    label: 'Source arrowhead',
                                    index: 1
                                },
                                fill: {
                                    type: 'color-palette',
                                    options: options.colorPaletteReset,
                                    group: 'marker-source',
                                    label: 'Color',
                                    when: { ne: { 'attrs/line/sourceMarker/d': 'M 0 0 0 0' } },
                                    index: 2
                                }
                            },
                            targetMarker: {
                                d: {
                                    type: 'select-box',
                                    options: options.arrowheadSize,
                                    group: 'marker-target',
                                    label: 'Target arrowhead',
                                    index: 1
                                },
                                fill: {
                                    type: 'color-palette',
                                    options: options.colorPaletteReset,
                                    group: 'marker-target',
                                    label: 'Color',
                                    when: { ne: { 'attrs/line/targetMarker/d': 'M 0 0 0 0' } },
                                    index: 2
                                }
                            }
                        }
                    },
                    router: {
                        name: {
                            type: 'select-button-group',
                            options: options.router,
                            group: 'connection',
                            label: 'Connection type',
                            index: 1
                        },
                        args: {
                            side: {
                                type: 'select-box',
                                options: options.side,
                                placeholder: 'Pick a side',
                                group: 'connection',
                                label: 'Anchors side',
                                when: { eq: { 'router/name': 'oneSide' }, otherwise: { unset: true } },
                                index: 2
                            }
                        }
                    },
                    connector: {
                        name: {
                            type: 'select-button-group',
                            options: options.connector,
                            group: 'connection',
                            label: 'Connection style',
                            index: 3
                        }
                    },
                    labels: {
                        type: 'list',
                        group: 'labels',
                        label: 'Labels',
                        attrs: {
                            label: {
                                'data-tooltip': 'Set (possibly multiple) labels for the link',
                                'data-tooltip-position': 'right',
                                'data-tooltip-position-selector': '.joint-inspector'
                            }
                        },
                        item: {
                            type: 'object',
                            properties: {
                                attrs: {
                                    text: {
                                        text: {
                                            type: 'content-editable',
                                            label: 'text',
                                            defaultValue: 'label',
                                            index: 1,
                                            attrs: {
                                                label: {
                                                    'data-tooltip': 'Set text of the label',
                                                    'data-tooltip-position': 'right',
                                                    'data-tooltip-position-selector': '.joint-inspector'
                                                }
                                            }
                                        },
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Text Color',
                                            index: 5
                                        }
                                    },
                                    rect: {
                                        fill: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Fill',
                                            index: 3
                                        },
                                        stroke: {
                                            type: 'color-palette',
                                            options: options.colorPaletteReset,
                                            label: 'Outline',
                                            index: 4
                                        }
                                    }
                                },
                                position: {
                                    type: 'select-box',
                                    options: options.labelPosition || [],
                                    defaultValue: 0.5,
                                    label: 'Position',
                                    placeholder: 'Custom',
                                    index: 2,
                                    attrs: {
                                        label: {
                                            'data-tooltip': 'Position the label relative to the source of the link',
                                            'data-tooltip-position': 'right',
                                            'data-tooltip-position-selector': '.joint-inspector'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                groups: {
                    connection: {
                        label: 'Connection',
                        index: 1
                    },
                    'marker-source': {
                        label: 'Source marker',
                        index: 2
                    },
                    'marker-target': {
                        label: 'Target marker',
                        index: 3
                    },
                    labels: {
                        label: 'Labels',
                        index: 4
                    }
                }
            },
            'standard.Image': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 5
                            }
                        },
                        image: {
                            xlinkHref: {
                                type: 'select-box',
                                options: options.imageIcons,
                                label: 'Image',
                                group: 'presentation',
                                index: 1
                            }
                        }
                    }
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'standard.InscribedImage': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Text',
                                group: 'text',
                                index: 1
                            },
                            fontSize: {
                                type: 'range',
                                min: 5,
                                max: 80,
                                unit: 'px',
                                label: 'Font size',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 2
                            },
                            fontFamily: {
                                type: 'select-box',
                                options: options.fontFamily,
                                label: 'Font family',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 3
                            },
                            fontWeight: {
                                type: 'select-box',
                                options: options.fontWeight,
                                label: 'Font thickness',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 4
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'text',
                                when: { ne: { 'attrs/label/text': '' } },
                                index: 5
                            }
                        },
                        image: {
                            xlinkHref: {
                                type: 'select-box',
                                options: options.imageIcons,
                                label: 'Image',
                                group: 'presentation',
                                index: 1
                            }
                        },
                        background: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Fill',
                                group: 'presentation',
                                index: 2
                            }
                        },
                        border: {
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Outline',
                                group: 'presentation',
                                index: 3
                            },
                            strokeWidth: {
                                type: 'range',
                                min: 0,
                                max: 10,
                                step: 1,
                                defaultValue: 1,
                                unit: 'px',
                                label: 'Outline thickness',
                                group: 'presentation',
                                when: { ne: { 'attrs/border/stroke': 'transparent' } },
                                index: 4
                            }
                        }
                    },
                },
                groups: {
                    presentation: {
                        label: 'Presentation',
                        index: 1
                    },
                    text: {
                        label: 'Text',
                        index: 2
                    }
                }
            },
            'Table': {
                inputs: {
                    attrs: {
                        headerLabel: {
                            text: {
                                type: 'content-editable',
                                label: 'Table Name',
                                group: 'text',
                                index: 1
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Header Color',
                                group: 'text',
                                index: 2
                            }
                        },
                        tabColor: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Tab Color',
                                group: 'presentation',
                                index: 1
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Body Fill',
                                group: 'presentation',
                                index: 2
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Body Stroke',
                                group: 'presentation',
                                index: 3
                            }
                        }
                    },
                    columns: {
                        type: 'list',
                        label: 'Columns',
                        group: 'columns',
                        item: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'text',
                                    label: 'Column Name'
                                },
                                type: {
                                    type: 'select-box',
                                    label: 'Data Type',
                                    options: ['int', 'varchar', 'datetime', 'boolean']
                                },
                                key: {
                                    type: 'toggle',
                                    label: 'Primary Key'
                                }
                            }
                        }
                    },
                    // Añadir la sección de métodos aquí correctamente
                    methods: {
                        type: 'list',
                        label: 'Methods',
                        group: 'methods',
                        addButtonLabel: 'Add Method',
                        item: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'text',
                                    label: 'Method Name'
                                },
                                params: {
                                    type: 'text',
                                    label: 'Parameters'
                                },
                                returnType: {
                                    type: 'text',
                                    label: 'Return Type'
                                }
                            }
                        }
                    }
                },
                groups: {
                    text: { label: 'Text', index: 1 },
                    presentation: { label: 'Presentation', index: 2 },
                    columns: { label: 'Columns', index: 3 },
                    methods: { label: 'Methods', index: 4 } // Asegúrate de que los métodos están en el grupo
                }
            },
            'UMLClass': {
                inputs: {
                    attrs: {
                        label: {
                            text: {
                                type: 'content-editable',
                                label: 'Class Name',
                                group: 'text',
                                index: 1
                            },
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Text Color',
                                group: 'text',
                                index: 2
                            }
                        },
                        '.attributes': {
                            text: {
                                type: 'content-editable',
                                label: 'Attributes',
                                group: 'attributes',
                                index: 1
                            }
                        },
                        '.methods': {
                            text: {
                                type: 'content-editable',
                                label: 'Methods',
                                group: 'methods',
                                index: 2
                            }
                        },
                        body: {
                            fill: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Body Fill',
                                group: 'presentation',
                                index: 1
                            },
                            stroke: {
                                type: 'color-palette',
                                options: options.colorPalette,
                                label: 'Body Stroke',
                                group: 'presentation',
                                index: 2
                            }
                        }
                    }
                },
                groups: {
                    text: { label: 'Class Name', index: 1 },
                    attributes: { label: 'Attributes', index: 2 },
                    methods: { label: 'Methods', index: 3 },
                    presentation: { label: 'Presentation', index: 4 }
                }
            }
        };
    }
}


