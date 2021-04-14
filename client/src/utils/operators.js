import { from } from "rxjs";
import { mergeMap, filter } from "rxjs/operators";

export function filterById(id) {
  return (e$) =>
    e$.pipe(filter((e) => !!Object.values(e).find((f) => f.identifier === id)));
}

// @TODO find way to clone event
// try to use expand
export function cloneEventPerTouchAndPrep(prepFn) {
  return (o$) => {
    return o$.pipe(
      mergeMap((e) =>
        from(
          Object.values(e.changedTouches).reduce((acc, t) => {
            acc.push(prepFn(e, t.identifier));
            return acc;
          }, [])
        )
      )
    );
  };
}
