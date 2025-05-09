/**
 * @description Shredded image abstract implementation
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {ShreddedImage} from '../../types'

export default abstract class AbstractShreddedImg implements ShreddedImage {
  /**
   * @type {HTMLCanvasElement | null}
   * @note Image is converted to canvas to process it and generate strips
   * @note This property is null until image is loaded and canvas generated
   * @see  _initImg()
   * @see  _initStrips()
   */
  img: HTMLCanvasElement | null

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
   * @type {number}
   */
  alpha: number

  /**
   * @type {HTMLImageElement}
   * @note Original image element converted into a canvas element to process it
   * @see  _initImg()
   */
  imgElement: HTMLImageElement

  /**
   * Constructor
   *
   * @param {string}  src
   * @param {number}  width
   * @param {number}  stripSize
   * @param {boolean} isEven
   * @param {number}  spread
   * @param {number}  x
   * @param {number}  y
   * @param {number}  alpha
   */
  constructor(
    src: string,
    width: number,
    stripSize: number,
    isEven: boolean = true,
    spread: number = 2,
    x: number = 0,
    y: number = 0,
    alpha: number = 1,
  ) {
    this.stripSize = stripSize
    this.spread = spread
    this.x = x
    this.y = y
    this.alpha = alpha

    /**
     * @note After image is loaded, we are ready to generate
     *       the canvas from image and the strips from this canvas
     */
    this.imgElement = new Image()
    this.imgElement.src = src
    this.imgElement.onload = () => {
      this._initImg(width)
      this._initStrips(isEven)
    }
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    if (this.strips) {
      context.save()
      context.globalAlpha = this.alpha
      for (let i = 0; i < this.strips.length; i++) {
        const strip = this.strips[i]
        this._drawStrip(context, strip, i)
      }
      context.restore()
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
   * Init image
   *
   * @param   {number} width
   * @returns {void}
   */
  protected _initImg(width: number): void {
    const ar = this.imgElement.width / this.imgElement.height
    const height = width / ar
    this.img = document.createElement('canvas')
    this.img.width = width
    this.img.height = height
    const context = this.img.getContext('2d') as CanvasRenderingContext2D
    context.drawImage(this.imgElement, 0, 0, width, height)
  }

  /**
   * Init strips
   *
   * @param   {boolean} isEven
   * @returns {void}
   * @note    By default, strips are being generated as vertical strips
   */
  protected _initStrips(isEven: boolean = true): void {
    this.strips = []
    if (this.img) {
      for (let x = 0; x < this.img.width; x += this.stripSize) {
        if (
          (isEven && (x / this.stripSize) % 2 === 0) ||
          (!isEven && (x / this.stripSize) % 2 !== 0)
        ) {
          const strip = this._initStrip(x)
          if (strip) {
            this.strips.push(strip)
          }
        }
      }
    }
  }

  /**
   * Init strip
   *
   * @param   {number} x
   * @returns {HTMLCanvasElement | null}
   * @note    By default, strips are being generated as vertical strips
   */
  protected _initStrip(x: number): HTMLCanvasElement | null {
    if (this.img) {
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

      return strip
    }

    return null
  }
}
