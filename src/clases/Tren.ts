import { IVagon } from "../types";
import { Vagon } from "./Vagon";

export class Tren<T> {
    private locomotora: IVagon<T> | undefined;
  
    constructor() {
      this.locomotora = undefined;
    }
  
    agregar(valor: T, color: string): void {
      if (this.locomotora === undefined) {
        this.locomotora = new Vagon<T>(valor, color);
      } else {
        // Recorrer hasta el último vagón
        let vagonActual: IVagon<T> = this.locomotora;
        
        // Mientras exista un vagón siguiente (gancho no sea null)
        while (vagonActual.gancho !== null) {
          vagonActual = vagonActual.gancho;
        }
        // Cuando llegamos al último vagón, enganchamos uno nuevo
        vagonActual.gancho = new Vagon<T>(valor, color);
      }
    }
    
    // Método para agregar un vagón después de un vagón específico
    agregarDespuesDe(valorReferencia: T, nuevoValor: T, color: string): boolean {
      if (this.locomotora === undefined) {
        return false;
      }
      
      let vagonActual: IVagon<T> = this.locomotora;
      
      // Buscar el vagón después del cual queremos agregar
      while (vagonActual !== null && vagonActual.vagon !== valorReferencia) {
        if (vagonActual.gancho === null) {
          return false; // No encontramos el vagón de referencia
        }
        vagonActual = vagonActual.gancho;
      }
      
      // Si encontramos el vagón de referencia
      const nuevoVagon = new Vagon<T>(nuevoValor, color);
      nuevoVagon.gancho = vagonActual.gancho;
      vagonActual.gancho = nuevoVagon;
      
      return true;
    }
    
    // Método para eliminar el último vagón
    eliminarUltimo(): boolean {
      // Si la lista está vacía, no hay nada que eliminar
      if (this.locomotora === undefined) {
        return false;
      }
      
      // Si solo hay un vagón (la locomotora)
      if (this.locomotora.gancho === null) {
        this.locomotora = undefined;
        return true;
      }
      
      // Buscar el penúltimo vagón
      let vagonActual: IVagon<T> = this.locomotora;
      while (vagonActual.gancho !== null && vagonActual.gancho.gancho !== null) {
        vagonActual = vagonActual.gancho;
      }
      
      // Desconectar el último vagón
      vagonActual.gancho = null;
      return true;
    }
    
    obtenerVagones(): Array<{valor: T, color: string}> {
      const resultado: Array<{valor: T, color: string}> = [];
      let vagonActual: IVagon<T> | null | undefined = this.locomotora;
      
      while (vagonActual !== null && vagonActual !== undefined) {
        resultado.push({
          valor: vagonActual.vagon,
          color: vagonActual.color
        });
        vagonActual = vagonActual.gancho;
      }
      
      return resultado;
    }
    
    eliminar(valor: T): boolean {
      // Si la lista está vacía, no hay nada que eliminar
      if (this.locomotora === undefined) {
        return false;
      }
      
      // Caso especial: si el valor a eliminar está en la locomotora
      if (this.locomotora.vagon === valor) {
        this.locomotora = this.locomotora.gancho || undefined;
        return true;
      }
      
      // Buscar el vagón anterior al que queremos eliminar
      let vagonActual: IVagon<T> = this.locomotora;
      while (vagonActual.gancho !== null && vagonActual.gancho.vagon !== valor) {
        vagonActual = vagonActual.gancho;
      }
      
      // Si encontramos el vagón a eliminar
      if (vagonActual.gancho !== null) {
        // "Saltamos" el vagón eliminado reconectando los enlaces
        vagonActual.gancho = vagonActual.gancho.gancho;
        return true;
      }
      
      // Si llegamos aquí, el valor no se encontró
      return false;
    }
  }