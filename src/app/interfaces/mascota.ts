export interface Mascota {
    id?: number,
    nombre: string,
    edad: number,
    raza: string,
    color: string,
    peso: number
}

export interface Raza {
    razaid: number,
    razanombre: string
}

export interface Color {
    colorid: number,
    colornombre: string
}