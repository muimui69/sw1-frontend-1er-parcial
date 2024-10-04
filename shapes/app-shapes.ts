/*! JointJS+ v4.0.1 - HTML5 Diagramming Framework - TRIAL VERSION

Copyright (c) 2024 client IO

2024-10-01

This Source Code Form is subject to the terms of the JointJS+ Trial License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at https://www.jointjs.com/license
or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/

// import * as joint from '@joint/plus';
import * as joint from '../build/package/joint-plus';
import { dia, shapes, util } from '../build/package/joint-plus';
import type { ColumnData } from './interfaces';
//@ts-ignore
import key from '../assets/key.svg';

const cache = new Map();

export class Table extends shapes.standard.HeaderedRecord {

    portLabelMarkup = [{
        tagName: 'text',
        selector: 'portLabel'
    }];

    override defaults() {
        return util.defaultsDeep({
            type: 'Table',
            columns: [],
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
                    fill: '#636363',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    textWrap: {
                        ellipsis: true,
                        height: 30
                    }
                },
                itemBodies_0: {
                    magnet: 'item'
                },
                group_1: {
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
                    refX: '50%',
                    refX2: -26
                }
            }
        }, joint.shapes.standard.HeaderedRecord.prototype.defaults);
    }

    override preinitialize(): void {
        this.markup = [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'rect',
            selector: 'header'
        }, {
            tagName: 'rect',
            selector: 'tabColor'
        }, {
            tagName: 'text',
            selector: 'headerLabel'
        }];
    }

    override initialize(...args: any[]) {
        super.initialize(...args);
        this.on('change', () => this.onColumnsAndMethodsChange());
        this._setColumnsAndMethods(this.get('columns'), this.get('methods'));
    }

    setColumns(columns: Array<ColumnData>) {
        this.set('columns', columns);
        return this;
    }

    onColumnsAndMethodsChange() {
        if (this.hasChanged('columns') || this.hasChanged('methods')) {
            this._setColumnsAndMethods(this.get('columns'), this.get('methods'));
        }
    }

    setName(name: string, opt?: object) {
        return this.attr(['headerLabel', 'text'], name, opt);
    }

    getName(): string {
        return this.attr(['headerLabel', 'text']);
    }

    setTabColor(color: string) {
        return this.attr(['tabColor', 'fill'], color);
    }

    getTabColor(): string {
        return this.attr(['tabColor', 'fill']);
    }

    override toJSON() {
        const json = super.toJSON();
        delete json.items;
        return json;
    }

    protected _setColumnsAndMethods(columns: Array<ColumnData> = [], methods: Array<{ name: string, returnType: string }> = []) {
        const columnNames: Array<object> = [];
        const columnValues: Array<object> = [];
        const methodNames: Array<object> = [];

        columns.forEach((item, i) => {
            if (!item.name) return;

            const columnId = `column_${i}`;

            columnNames.push({
                id: columnId,
                label: item.name,
                span: 2
            });

            const value = {
                id: `${item.type}_${i}`,
                label: item.type
            };
            if (item.key) {
                Object.assign(value, {
                    group: 'keys',
                    icon: key
                });
            }
            columnValues.push(value);
        });

        methods.forEach((method, i) => {
            const methodId = `method_${i}`;
            methodNames.push({
                id: methodId,
                label: `${method.name}(): ${method.returnType}`,
                span: 2
            });
        });

        this.set('items', [columnNames, columnValues, methodNames]);
        this.removeInvalidLinks();

        return this;
    }

}

export class Link extends dia.Link {
    override defaults() {
        return {
            ...super.defaults,
            type: 'Link',
            z: -1,
            attrs: {
                wrapper: {
                    connection: true,
                    strokeWidth: 10
                },
                line: {
                    connection: true,
                    stroke: '#A0A0A0',
                    strokeWidth: 2
                }
            }
        }
    }
    override markup = [{
        tagName: 'path',
        selector: 'wrapper',
        attributes: {
            'fill': 'none',
            'stroke': 'transparent'
        }
    }, {
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }]

    static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
        const link = linkView.model;
        const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
        const opt: any = { offset: markerWidth, stroke: true };
        return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    }

    getMarkerWidth(type: any) {
        const d = (type === 'source') ? this.attr('line/sourceMarker/d') : this.attr('line/targetMarker/d');
        return this.getDataWidth(d);
    }

    getDataWidth(d: any) {
        return this.getDataWidthCached(d);
    }

    private getDataWidthCached = function (d: string) {
        if (cache.has(d)) {
            return cache.get(d);
        } else {
            const bbox = (new joint.g.Path(d)).bbox();
            cache.set(d, bbox ? bbox.width : 0);
            return cache.get(d);
        }
    };
}

export class Herencia extends dia.Link {
    override defaults() {
        return {
            ...super.defaults,
            type: 'Herencia',
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    targetMarker: {
                        type: 'path',
                        d: 'M 20 -10 0 0 20 10 Z', // Flecha de herencia
                        fill: 'white',
                        stroke: '#000000',
                    }
                }
            }
        }
    }
    override markup = [{
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }]

    static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
        const link = linkView.model;
        const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
        const opt: any = { offset: markerWidth, stroke: true };
        return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    }
}

export class Agregacion extends dia.Link {
    override defaults() {
        return {
            ...super.defaults,
            type: 'Agregacion',
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    targetMarker: {
                        type: 'path',
                        d: 'M 20 0 L 10 -10 L 0 0 L 10 10 Z', // Rombo vacío para agregación
                        fill: 'white',
                        stroke: '#000000'
                    }
                }
            }
        }
    }
    override markup = [{
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }]

    static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
        const link = linkView.model;
        const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
        const opt: any = { offset: markerWidth, stroke: true };
        return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    }
}

export class Composicion extends dia.Link {
    override defaults() {
        return {
            ...super.defaults,
            type: 'Composicion',
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    targetMarker: {
                        type: 'path',
                        d: 'M 20 0 L 10 -10 L 0 0 L 10 10 Z', // Rombo lleno para composición
                        fill: '#000000',
                        stroke: '#000000'
                    }
                }
            }
        }
    }
    override markup = [{
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }]

    static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
        const link = linkView.model;
        const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
        const opt: any = { offset: markerWidth, stroke: true };
        return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    }
}

export class Dependencia extends dia.Link {
    override defaults() {
        return {
            ...super.defaults,
            type: 'Dependencia',
            attrs: {
                line: {
                    stroke: '#000000',
                    strokeWidth: 2,
                    strokeDasharray: '5, 5', // Línea punteada para dependencia
                    targetMarker: {
                        type: 'path',
                        d: 'M 20 -10 L 0 0 L 20 10', // Flecha abierta para dependencia
                        fill: 'none',
                        stroke: '#000000'
                    }
                }
            }
        }
    }
    override markup = [{
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none'
        }
    }]

    static connectionPoint(line: any, view: any, magnet: any, _opt: any, type: any, linkView: any): joint.g.Point {
        const link = linkView.model;
        const markerWidth = (link.get('type') === 'Link') ? link.getMarkerWidth(type) : 0;
        const opt: any = { offset: markerWidth, stroke: true };
        return joint.connectionPoints.boundary.call(this, line, view, magnet, opt, type, linkView);
    }
}

const TableView = shapes.standard.RecordView;

Object.assign(shapes, {
    app: {
        Table,
        TableView,
        Link,
        Herencia,
        Agregacion,
        Composicion,
        Dependencia
    }
});

export const NavigatorElementView = joint.dia.ElementView.extend({

    body: null,

    markup: [{
        tagName: 'rect',
        selector: 'body',
        attributes: {
            'fill': '#31d0c6'
        }
    }],

    initFlag: ['RENDER', 'UPDATE', 'TRANSFORM'],

    presentationAttributes: {
        size: ['UPDATE'],
        position: ['TRANSFORM'],
        angle: ['TRANSFORM']
    },

    confirmUpdate: function (flags: number) {

        if (this.hasFlag(flags, 'RENDER')) { this.render(); }
        if (this.hasFlag(flags, 'UPDATE')) { this.update(); }
        if (this.hasFlag(flags, 'TRANSFORM')) { this.updateTransformation(); }
    },

    render: function () {
        const { fragment, selectors: { body } } = joint.util.parseDOMJSON(this.markup);
        this.body = body;
        this.el.appendChild(fragment);
    },

    update: function () {
        const { model, body } = this;
        const { width, height } = model.size();
        body.setAttribute('width', width);
        body.setAttribute('height', height);
    }
});


export const NavigatorLinkView = joint.dia.LinkView.extend({

    defaultTheme: null,

    initialize: function (options: any) {
        joint.mvc.View.prototype.initialize.call(this, options);
    },

    onMount: joint.util.noop,

    render: joint.util.noop,

    update: joint.util.noop
});

export const standard = joint.shapes.standard;

// } 