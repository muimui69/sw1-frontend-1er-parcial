/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

 2024-10-01 


This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


// import * as joint from '@joint/plus';
import * as joint from '../build/package/joint-plus';


export class ToolbarService {

    toolbar: joint.ui.Toolbar | undefined;

    create(commandManager: joint.dia.CommandManager, paperScroller: joint.ui.PaperScroller) {
        const { tools, groups } = this.getToolbarConfig();

        this.toolbar = new joint.ui.Toolbar({
            groups,
            tools,
            autoToggle: true,
            references: {
                paperScroller: paperScroller,
                commandManager: commandManager
            }
        });
    }

    getToolbarConfig() {

        return {

            groups: {
                'undo-redo': { index: 1 },
                'clear': { index: 2 },
                'export': { index: 3 },
                'print': { index: 4 },
                'fullscreen': { index: 5 },
                'order': { index: 6 },
                'layout': { index: 7 },
                'zoom': { index: 8 },
                'grid': { index: 9 },
                'snapline': { index: 10 }
            },

            tools: [
                {
                    type: 'undo',
                    name: 'undo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Undo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'redo',
                    name: 'redo',
                    group: 'undo-redo',
                    attrs: {
                        button: {
                            'data-tooltip': 'Redo',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'clear',
                    group: 'clear',
                    attrs: {
                        button: {
                            id: 'btn-clear',
                            'data-tooltip': 'Clear Paper',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'svg',
                    group: 'export',
                    text: 'Export SVG',
                    attrs: {
                        button: {
                            id: 'btn-svg',
                            'data-tooltip': 'Open as SVG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'png',
                    group: 'export',
                    text: 'Export PNG',
                    attrs: {
                        button: {
                            id: 'btn-png',
                            'data-tooltip': 'Open as PNG in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'xml',
                    group: 'export',
                    // text: 'Export XML',
                    text: 'Guardar cambios',
                    attrs: {
                        button: {
                            id: 'btn-xml',
                            'data-tooltip': 'Open as XML in a pop-up',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'print',
                    group: 'print',
                    attrs: {
                        button: {
                            id: 'btn-print',
                            'data-tooltip': 'Open a Print Dialog',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'to-front',
                    group: 'order',
                    text: 'Send To Front',
                    attrs: {
                        button: {
                            id: 'btn-to-front',
                            'data-tooltip': 'Bring Object to Front',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    name: 'to-back',
                    group: 'order',
                    text: 'Send To Back',
                    attrs: {
                        button: {
                            id: 'btn-to-back',
                            'data-tooltip': 'Send Object to Back',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'button',
                    group: 'layout',
                    name: 'layout',
                    attrs: {
                        button: {
                            id: 'btn-layout',
                            'data-tooltip': 'Auto-layout Graph',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-to-fit',
                    name: 'zoom-to-fit',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom To Fit',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'zoom-out',
                    name: 'zoom-out',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom Out',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'label',
                    name: 'zoom-slider-label',
                    group: 'zoom',
                    text: 'Zoom:'
                },
                {
                    type: 'zoom-slider',
                    name: 'zoom-slider',
                    group: 'zoom'
                },
                {
                    type: 'zoom-in',
                    name: 'zoom-in',
                    group: 'zoom',
                    attrs: {
                        button: {
                            'data-tooltip': 'Zoom In',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'separator',
                    group: 'grid'
                },
                {
                    type: 'label',
                    name: 'grid-size-label',
                    group: 'grid',
                    text: 'Grid size:',
                    attrs: {
                        label: {
                            'data-tooltip': 'Change Grid Size',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'range',
                    name: 'grid-size',
                    group: 'grid',
                    text: 'Grid size:',
                    min: 1,
                    max: 50,
                    step: 1,
                    value: 10
                },
                {
                    type: 'separator',
                    group: 'snapline'
                },
                {
                    type: 'checkbox',
                    name: 'snapline',
                    group: 'snapline',
                    label: 'Snaplines:',
                    value: true,
                    attrs: {
                        input: {
                            id: 'snapline-switch'
                        },
                        label: {
                            'data-tooltip': 'Enable/Disable Snaplines',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                },
                {
                    type: 'fullscreen',
                    name: 'fullscreen',
                    group: 'fullscreen',
                    attrs: {
                        button: {
                            'data-tooltip': 'Toggle Fullscreen Mode',
                            'data-tooltip-position': 'top',
                            'data-tooltip-position-selector': '.toolbar-container'
                        }
                    }
                }
            ]
        };
    }

}
