export interface Mascota {
    id?: number,
    nombre: string,
    edad: number,
    raza: string,
    color: string,
    peso: number
}

export interface MascotaResponse {
    id?: number,
    nombre: string,
    edad: number,
    razaId: number,
    colorId: number,
    peso: number
}

export interface Raza {
    razaId: number,
    razaNombre: string
}

export interface Color {
    colorId: number,
    colorNombre: string
}