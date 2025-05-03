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
      // context.drawImage(this.#element, x, y, this.#width, this.#height)
      this.#drawStripes(context, x, y)
    }
  }

  /**
   * Draw stripes
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {number}                   originX
   * @param   {number}                   originY
   * @returns {void}
   */
  #drawStripes(
    context: CanvasRenderingContext2D,
    originX: number,
    originY: number,
  ): void {
    const stripeWidth = this.#element.width * 0.1
    for (let x = 0; x < this.#element.width; x += stripeWidth) {
      if ((x / stripeWidth) % 2) {
        context.drawImage(
          this.#element,
          originX + x,
          originY,
          stripeWidth,
          this.#element.height,
          originX + x,
          originY,
          stripeWidth,
          this.#height,
        )
      }
    }
  }
}
