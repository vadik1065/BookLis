import { Book, EpubCFI, Rendition } from "epubjs";
import { makeAutoObservable, computed, autorun, makeObservable, observable, action } from "mobx";
import { sleep } from "../utils/utils";

class CurrentBook {
  currentPage: null | number | string = null;

  #pages: Array<Number> = [];
  #book: Book | null = null;
  #rendition: Rendition | null = null;

  constructor() {
    // makeObservable(this, {
    //   currentPage: observable,
    //   setBook: action,
    //   definePages: action,
    // });
    makeAutoObservable(this);
  }

  // задаём новую книгу
  setBook(newBook: Book) {
    this.#book = newBook;
    this.#rendition = newBook.rendition;
    this.definePages();
  }

  // получаем текущую книгу
  get book() {
    return this.#book;
  }

  LOG(...arg) {
    console.log(...arg);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////  СТРАНИЦЫ  ///////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  async definePages() {
    console.log("пересчёт страниы");

    let curPage = this.#pages[0] || 0;
    let totalPAge = this.#pages[1] || 99;
    this.LOG(this.#rendition);
    try {
      await sleep(50); // CRUTCH нужно понять какого поле дожилаться для отображения страницы

      curPage = this.#rendition.location.start.displayed.page;
      totalPAge = this.#rendition.location.start.displayed.total;
    } catch (e) {
      console.log(e);
    }

    console.log(curPage);

    this.#pages = [curPage, totalPAge];
    this.#getCurrentPage();
  }

  // получаем текущюю страницу
  #getCurrentPage() {
    this.currentPage = `${this.#pages[0]} / ${this.#pages[1]}`;
  }

  // перейти к следующей
  nextPage() {
    this.#rendition.next().then((e) => {
      this.definePages();
    });
  }

  // перейти к предыдущей
  prevPage() {
    this.#rendition.prev().then((e) => {
      this.definePages();
    });
  }
}

export default new CurrentBook();
