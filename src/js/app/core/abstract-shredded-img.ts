/**
 * @description Shredded image abstract implementation
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {ShreddedImage} from '../../types'

export default abstract class AbstractShreddedImg implements ShreddedImage {
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
   * @type {HTMLCanvasElement | null}
   */
  protected _img: HTMLCanvasElement | null

  /**
   * @type {HTMLCanvasElement[]}
   */
  protected _strips: HTMLCanvasElement[] | null

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
   * @param {boolean}          isEven
   */
  constructor(
    img: HTMLImageElement,
    width: number,
    height: number,
    stripSize: number,
    spread: number,
    x: number,
    y: number,
    isEven: boolean = true,
  ) {
    this.stripSize = stripSize
    this.spread = spread
    this.x = x
    this.y = y

    this._initImg(img, width, height)
    this._initStrips(isEven)
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    if (this._strips) {
      for (let i = 0; i < this._strips.length; i++) {
        const strip = this._strips[i]
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
   * Init strips
   *
   * @param   {boolean} isEven
   * @returns {void}
   * @note    By default, strips are being generated as vertical strips
   */
  protected _initStrips(isEven: boolean = true): void {
    this._strips = []
    if (this._img) {
      for (let x = 0; x < this._img.width; x += this.stripSize) {
        if (
          (isEven && (x / this.stripSize) % 2 === 0) ||
          (!isEven && (x / this.stripSize) % 2 !== 0)
        ) {
          const strip = this._initStrip(x)
          if (strip) {
            this._strips.push(strip)
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
    if (this._img) {
      const strip = document.createElement('canvas')
      strip.width = this.stripSize
      strip.height = this._img.height

      const stripContext = strip.getContext('2d') as CanvasRenderingContext2D
      stripContext.drawImage(
        this._img,
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
    this._img = document.createElement('canvas')
    this._img.width = width
    this._img.height = height
    const context = this._img.getContext('2d') as CanvasRenderingContext2D
    context.drawImage(img, 0, 0, width, height)
  }
}
