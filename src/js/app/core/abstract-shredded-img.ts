/**
 * @description Shredded image abstract implementation
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default abstract class AbstractShreddedImg {
  /**
   * @type {HTMLCanvasElement}
   */
  img: HTMLCanvasElement

  /**
   * @type {HTMLCanvasElement[]}
   */
  strips: HTMLCanvasElement[]

  /**
   * @type {number}
   */
  stripSize: number

  /**
   * @type {number}
   */
  spread: number

  /**
   * @type {number}
   */
  x: number

  /**
   * @type {number}
   */
  y: number

  /**
   * Constructor
   *
   * @param {HTMLImageElement} img
   * @param {number}           width
   * @param {number}           height
   * @param {number}           stripSize
   * @param {number}           spread
   * @param {number}           x
   * @param {number}           y
   */
  constructor(
    img: HTMLImageElement,
    width: number,
    height: number,
    stripSize: number,
    spread: number,
    x: number,
    y: number,
  ) {
    this.stripSize = stripSize
    this.spread = spread
    this.x = x
    this.y = y

    this._initImg(img, width, height)
    this._initStrips()
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.strips.length; i++) {
      const strip = this.strips[i]
      this._drawStrip(context, strip, i)
    }
  }

  /**
   * Draw strip
   *
   * @param   {CanvasRenderingContext2D} context
   * @param   {HTMLCanvasElement}        strip
   * @param   {number}                   index
   * @returns {void}
   */
  protected _drawStrip(
    context: CanvasRenderingContext2D,
    strip: HTMLCanvasElement,
    index: number,
  ): void {
    const x = this.x + this.stripSize * index * this.spread
    context.drawImage(strip, x, this.y, strip.width, strip.height)
  }

  /**
   * Init strips
   *
   * @returns {void}
   * @note    By default, strips are being generated as vertical strips
   */
  protected _initStrips(): void {
    this.strips = []
    for (let x = 0; x < this.img.width; x += this.stripSize) {
      const strip = document.createElement('canvas')
      strip.width = this.stripSize
      strip.height = this.img.height

      const stripContext = strip.getContext('2d') as CanvasRenderingContext2D
      stripContext.drawImage(
        this.img,
        x,
        0,
        strip.width,
        strip.height,
        0,
        0,
        strip.width,
        strip.height,
      )

      this.strips.push(strip)
    }
  }

  /**
   * Init image
   *
   * @param   {HTMLImageElement} img
   * @param   {number}           width
   * @param   {number}           height
   * @returns {void}
   * @note    Image is persisted in a canvas to be able to process it
   */
  protected _initImg(
    img: HTMLImageElement,
    width: number,
    height: number,
  ): void {
    this.img = document.createElement('canvas')
    this.img.width = width
    this.img.height = height
    const context = this.img.getContext('2d') as CanvasRenderingContext2D
    context.drawImage(img, 0, 0, width, height)
  }
}
