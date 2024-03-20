import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    guardarItemEnLocalStorage(clave: string, valor: string): void {
        localStorage.setItem(clave, valor);
    }

    obtenerItemDelLocalStorage(clave: string): any {
        return localStorage.getItem(clave);
    }
    
    EliminarItemDelLocalStorage(clave: string): any {
        return localStorage.removeItem(clave);
    }
}