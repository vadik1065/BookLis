import { Book } from "epubjs";
import { makeAutoObservable } from "mobx";
import { Options } from "./interfaces/optionsBook";

class OptionsBook {
  #options: Options;

  constructor() {
    this.#options = { visualPageCounte: "numbers" };
    makeAutoObservable(this);
  }

  // получаем текущие настройки книги
  getOptions(field?: "visualPageCounte") {
    // CRUTCH field
    if (field) {
      this.#options[field];
    }

    return this.#options;
  }
}

export default new OptionsBook();
