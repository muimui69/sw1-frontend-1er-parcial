import { dia, g, routers } from '../build/package/joint-plus';
import type { RouterOptions } from './interfaces';

const DEFAULT_PADDING = 30;

export const routerNamespace = { ...routers };

function getOutsidePoint(bbox: g.Rect, angle: number, anchor: g.Point, padding: number) {
    const ref = anchor.clone();
    const center = bbox.center();
    if (angle) ref.rotate(center, angle);
    const point = new g.Point(bbox.x, ref.y);
    if (point.equals(anchor)) {
        point.x--;
        padding--;
    }
    point.move(ref, (ref.x < center.x) ? padding : - bbox.width - padding);
    if (angle) point.rotate(center, -angle);
    return point.round();
}

const customRouter = function (vertices: Array<g.Point>, opt: RouterOptions, linkView: dia.LinkView) {
    const link = linkView.model;
    const route = [];
    // Target Point
    const source = link.getSourceElement();
    if (source) {
        route.push(getOutsidePoint(
            source.getBBox(),
            source.angle(),
            linkView.getEndAnchor('source'),
            opt.padding || opt.sourcePadding || DEFAULT_PADDING
        ));
    }
    // Vertices
    Array.prototype.push.apply(route, vertices);
    // Source Point
    const target = link.getTargetElement();
    if (target) {
        route.push(getOutsidePoint(
            target.getBBox(),
            target.angle(),
            linkView.getEndAnchor('target'),
            opt.padding || opt.targetPadding || DEFAULT_PADDING
        ));
    }
    return route;
}

Object.assign(routerNamespace, {
    customRouter
});
