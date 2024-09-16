import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        // if the DOM node exists (the div styledmodal) and
        // if the div (stylesmodal) does not contain the element that was click the e.target then close the modal.
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click outside");
          handler();
        }
      }

      // we need this third argument to set up event listener in the capturing phase.
      // This means the event is caught as it travels down to the target. so the ref.current will not alwas set to true even upon opening the modal.
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
