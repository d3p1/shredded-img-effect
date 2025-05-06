/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export interface ShreddedImage {
  strips: HTMLCanvasElement[]
  stripSize: number
  spread: number
  x: number
  y: number
}

export type Keyframe<T extends object> = Array<
  {ref: T} & {[K in keyof T]?: T[K]}
>
