/**
 * @description Shredded image abstract implementation
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {ShreddedImage} from '../../types'

export default abstract class AbstractShreddedImg implements ShreddedImage {
  /**
   * @type {HTMLCanvasElement | null}
   */
  img: HTMLCanvasElement | null

  /**
   * @type {HTMLCanvasElement[]}
   */
  strips: HTMLCanvasElement[] | null

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
   * @param {string}  src
   * @param {number}  width
   * @param {number}  stripSize
   * @param {number}  spread
   * @param {number}  x
   * @param {number}  y
   * @param {boolean} isEven
   */
  constructor(
    src: string,
    width: number,
    stripSize: number,
    spread: number,
    x: number = 0,
    y: number = 0,
    isEven: boolean = true,
  ) {
    this.spread = spread
    this.stripSize = stripSize
    this.x = x
    this.y = y

    this._initImg(src, width, isEven)
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    if (this.strips) {
      for (let i = 0; i < this.strips.length; i++) {
        const strip = this.strips[i]
        this._drawStrip(context, strip, i)
      }
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
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isEven
   * @returns {void}
   * @note    Image is persisted in a canvas to be able to process it
   */
  protected _initImg(src: string, width: number, isEven: boolean): void {
    const img = new Image()
    img.src = src

    img.onload = () => {
      const ar = img.width / img.height
      const height = width / ar

      this.img = document.createElement('canvas')
      this.img.width = width
      this.img.height = height
      const context = this.img.getContext('2d') as CanvasRenderingContext2D
      context.drawImage(img, 0, 0, width, height)

      this._initStrips(isEven)
    }
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
