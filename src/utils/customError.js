/*export class CustomError{
    static CustomError(nombre, mensaje, codigo, descripcion){
        let error = new Error(mensaje);
        error.name=nombre;
        error.descripcion=descripcion;
        error.codigo=codigo;
        return error;
    }
}*/

export class CustomError extends Error {
    constructor(nombre, mensaje, codigo, descripcion) {
        super(mensaje);
        this.name = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
    }
}