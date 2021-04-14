import { fromEvent, of, concat, merge } from "rxjs";
import {
  mergeMap,
  takeUntil,
  distinctUntilChanged,
  skipLast,
  shareReplay,
  take,
  groupBy,
} from "rxjs/operators";
import { filterById, cloneEventPerTouchAndPrep } from "./operators";

/*
 * TouchManager
 *
 * What is it solving?
 *
 * Touch events have a complex structure.
 * There is the possibility to have multiple touches in the same event.
 * TouchManager takes care of splitting thous events into single touches.
 *
 * This file exposes following things:
 * - getTouchstart$(): A method to recieve touchstart events from a specific dom element as observable
 * - getTouchmove$(): A method to recieve touchmoe events from a specific dom element as observable
 * - getTouchend$(): A method to recieve touchend events from a specific dom element as observable
 * - bundeledTouches$: An observable that:
 *   - splits events with multiple touches into multiple events
 *   - returns a stream that contains touch -start, -move and -end events
 *   - formats all touch events to TouchInfo objects
 */
// export interface TouchInfo {
//   identifier: number;
//   type: string;
//   xY: number[];
//   e: Touch | MouseEvent;
//   timeStamp: number;
// }

// TouchEvent: developer.mozilla.org/en-US/docs/Web/API/TouchEvent

export const getTouchstart$ = (elem = document) =>
  fromEvent < TouchEvent > (elem, "touchstart");
export const getTouchmove$ = (elem = document) =>
  fromEvent < TouchEvent > (elem, "touchmove");
export const getTouchend$ = (elem = document) =>
  fromEvent < TouchEvent > (elem, "touchend");
//.pipe( tap(e => console.log('I: ', e)))

export const getTouchcancel$ = (elem = document) =>
  fromEvent < TouchEvent > (elem, "touchcancel");
//.pipe( tap(e => console.log('I: ', e)))

// As 2 touches can happen at the same time we have to split the event
export const getSplittedTouchstart$ = (elem = document) =>
  getTouchstart$(elem).pipe(cloneEventPerTouchAndPrep(prepEventByIdentifier));
export const getSplittedTouchmove$ = (elem = document) =>
  getTouchmove$(elem).pipe(cloneEventPerTouchAndPrep(prepEventByIdentifier));
export const getSplittedTouchend$ = (elem = document) =>
  getTouchend$(elem).pipe(cloneEventPerTouchAndPrep(prepEventByIdentifier));
export const getSplittedTouchcancel$ = (elem = document) =>
  getTouchcancel$(elem).pipe(cloneEventPerTouchAndPrep(prepEventByIdentifier));

export function getSingleOrderedTouch$(elem) {
  return getSplittedTouchstart$(elem).pipe(
    mergeMap((tsS) => {
      const toucheEnd$ =
        merge <
        TouchInfo >
        (getSplittedTouchend$(), getSplittedTouchcancel$()).pipe(
          filterById(tsS.identifier),
          shareReplay(1),
          take(1)
        );
      const toucheMove$ = getSplittedTouchmove$().pipe(
        filterById(tsS.identifier),
        // We ignor all move event on the same position
        // this is a side effect from the native event structure.
        // If we have i.e. 2 screen contacts and only one is moving
        // also the non moving position is emitted with evers event
        // To keep only important imformation remaining we skip thouse
        distinctUntilChanged((prev, curr) => {
          if (
            Math.abs(prev.xY[0] - curr.xY[0]) <= 1 &&
            Math.abs(prev.xY[1] - curr.xY[1]) <= 1
          ) {
            console.log(
              "skipped: ",
              prev.identifier,
              prev.xY,
              curr.identifier,
              curr.xY
            );
          }

          // For some reason the diff is sometimes 1px even if three was no move.
          // We skip this to avoid unneeded events
          // return prev.xY[0] === curr.xY[0] && prev.xY[1] === curr.xY[1];

          // @TODO rethik if it is a good idaa to skip moves with diff <=1
          return (
            Math.abs(prev.xY[0] - curr.xY[0]) <= 1 &&
            Math.abs(prev.xY[1] - curr.xY[1]) <= 1
          );
        }),
        takeUntil(toucheEnd$)
      );

      return concat(
        of(tsS),
        // We ignor the last move event as
        // the end event is on the exactly same position
        // and the time is nearly the same
        toucheMove$.pipe(skipLast(1)),
        toucheEnd$
      );
    })
  );
}

export function getSingleOrderedTouch$$(elem) {
  return getSingleOrderedTouch$(elem).pipe(groupBy((t) => t.identifier));
}

// = HELPER =====================================================

function getXY(e) {
  return [e.pageX, e.pageY];
}

function prepEventByIdentifier(e, identifier) {
  const key = Object.keys(e.changedTouches).find(
    (it) => e.changedTouches[it].identifier === identifier
  );
  return {
    identifier,
    timeStamp: e.timeStamp,
    type: e.type,
    xY: getXY(e.changedTouches[key]),
    e: e.changedTouches[key],
  };
}
