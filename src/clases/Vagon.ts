import { IVagon } from "../types";

export class Vagon<T> implements IVagon<T> {
    vagon: T;
    color: string;
    gancho: IVagon<T> | null;
  
    constructor(valor: T, color: string) {
      this.vagon = valor;
      this.color = color;
      this.gancho = null;
    }
  }