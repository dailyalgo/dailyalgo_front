/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useCallback, RefObject } from "react";

type HookType = (ref: RefObject<HTMLElement>, handler: (...args: any[]) => void) => void;

const useClickOutside: HookType = (ref, handler) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOutsideClick = useCallback(handler, [ref]);

  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handleOutsideClick(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handleOutsideClick]);
};

export default useClickOutside;

/*
* How to use

import { useRef, useState } from "react"
import useClickOutside from "./useClickOutside"

export default function ClickOutsideComponent() {
  const [open, setOpen] = useState(false)
  const modalRef = useRef()

  useClickOutside(modalRef, () => {
    if (open) setOpen(false)
  })

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <div
        ref={modalRef}
        style={{
          display: open ? "block" : "none",
        }}
      >
        <span>Modal</span>
      </div>
    </>
  )
}

 */
