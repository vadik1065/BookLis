import { useEffect } from "react";
import currentBook from "../store/currentBook";
import { Rendition } from "epubjs";

export default function useFlupPage(elem: HTMLElement, rendition: Rendition) {
  useEffect(() => {
    let start;
    let end;

    const touchStart = (event: TouchEvent) => {
      start = event.changedTouches[0];
    };

    const touchEnd = (event: TouchEvent) => {
      end = event.changedTouches[0];
      let hr = (end.screenX - start.screenX) / elem.getBoundingClientRect().width;
      let vr = (end.screenY - start.screenY) / elem.getBoundingClientRect().height;
      if (hr > vr && hr > 0.25) return currentBook.prevPage();
      if (hr < vr && hr < -0.25) return currentBook.nextPage();
      if (vr > hr && vr > 0.25) return;
      if (vr < hr && vr < -0.25) return;
    };
    if (rendition && elem) {
      console.log(currentBook.book);

      rendition.on("touchstart", touchStart);
      rendition.on("touchend", touchEnd);
    }

    return () => {
      rendition.off("touchstart", touchStart);
      rendition.off("touchend", touchEnd);
    };
  }, [rendition, elem]);
}
