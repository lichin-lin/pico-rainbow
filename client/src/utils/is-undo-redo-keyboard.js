// TODO: also check for mobile usage
const check = (ev, style, shift) => {
  var macAllow = !style || style === "mac",
    winAllow = !style || style === "windows",
    code = ev.keyCode || ev.which;

  if (code !== 122 && code !== 90) return false;
  if (macAllow && ev.metaKey && shift && !ev.ctrlKey && !ev.altKey) return true;
  if (winAllow && ev.ctrlKey && shift && !ev.metaKey && !ev.altKey) return true;
  return false;
}
// export default function (ev, style) {
//   return undo(ev, style) || redo(ev, style);
// };

export function undo (ev, style) {
  return check(ev, style, !ev.shiftKey);
}

export function redo (ev, style) {
  return check(ev, style, ev.shiftKey);
}
