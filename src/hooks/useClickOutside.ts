import { RefObject } from "react";

export function useClickOutside(ref: RefObject<HTMLElement>, cb: () => void) {
  document.addEventListener("click", (e) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      cb();
    }
  });
}
