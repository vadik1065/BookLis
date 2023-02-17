import { observer } from "mobx-react-lite";
import currentBook from "../../../store/currentBook";
import useFlupPage from "../../../hooks/useFlupPage";

const Controls: React.FC = observer(() => {
  const renditionElem = currentBook.book?.rendition;
  const rendition = currentBook.book?.rendition;

  // useFlupPage(globalThis.window?.document.getElementById("area-for-book") , currentBook.book?.rendition);

  return (
    <div>
      <div className="cont-page-counter">
        <div className="page-counter"> {currentBook.currentPage} </div>
        <div onClick={() => currentBook.prevPage()}> prev</div>
        <div onClick={() => currentBook.nextPage()}> next</div>
      </div>
    </div>
  );
});

export default Controls;
