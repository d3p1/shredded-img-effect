/**
 * @description Img
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Img {
  /**
   * @type {HTMLImageElement}
   */
  readonly #element: HTMLImageElement

  /**
   * @type {number}
   */
  readonly #width: number

  /**
   * @type {number}
   */
  readonly #height: number

  /**
   * Constructor
   *
   * @param {HTMLImageElement} e
   * @param {number}           width
   * @param {number}           height
   */
  constructor(e: HTMLImageElement, width: number, height: number) {
    this.#element = e
    this.#width = width
    this.#height = height
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {number}                   x
   * @param   {number}                   y
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D, x: number, y: number): void {
    if (this.#element.complete) {
      context.drawImage(this.#element, x, y, this.#width, this.#height)
    }
  }
}
