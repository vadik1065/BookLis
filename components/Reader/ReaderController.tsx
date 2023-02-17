import React, { useEffect, useState } from "react";
import Epub, { Book, Rendition } from "epubjs";
import CSSreader from "./reader.module.css";
import Controls from "./controls/Controls";
import currentBook from "../../store/currentBook";

const BookReader: React.FC = () => {
  const AREA_WIDTH = globalThis.window?.innerWidth - 10;
  const AREA_HEIGHT = globalThis.window?.innerHeight - 100;

  const handleFileRead = (file?: File) => {
    const reader: Book = Epub("/static/filesBook/Leto-v-pionerskom-galstuke.epub");
    const rendition: Rendition = reader.renderTo("area-for-book", {
      width: AREA_WIDTH,
      height: AREA_HEIGHT,
    });

    rendition.on("displayed", (event) => {
      let start = null;
      let end = null;
      const el = event.document.documentElement;

      console.log(el.getBoundingClientRect());

      rendition.on("touchstart", (event) => {
        start = event.changedTouches[0];
      });
      rendition.on("touchend", (event) => {
        end = event.changedTouches[0];
        let hr = (end.screenX - start.screenX) / AREA_WIDTH;
        let vr = (end.screenY - start.screenY) / AREA_HEIGHT;
        // if (hr > vr && hr > 0.25) return currentBook.prevPage();
        // if (hr < vr && hr < -0.25) return currentBook.nextPage();
        // if (vr > hr && vr > 0.25) return;
        // if (vr < hr && vr < -0.25) return;
        console.log(hr);
        console.log(el.getBoundingClientRect().width);

        if (hr > vr && hr > 0.22) return currentBook.prevPage();
        if (hr < vr && hr < -0.22) return currentBook.nextPage();
      });
    });

    rendition.display().then(() => {
      currentBook.setBook(reader);
    });
  };

  useEffect(() => {
    handleFileRead();
  }, []);

  return (
    <div>
      {/* <input type="file" onChange={(e) => handleFileRead(e.target.files[0])} /> */}
      <div className={CSSreader.conteinerBook} onClick={(e) => console.log("e")}>
        <div id="area-for-book" draggable={true} className={CSSreader.areaForBook} />
        <div className="control-top-area" />
      </div>

      <Controls />
    </div>
  );
};

export default BookReader;
