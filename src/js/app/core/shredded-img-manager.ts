/**
 * @description Shredded image manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AbstractShreddedImg from './abstract-shredded-img.ts'
import HorizontalShreddedImg from './horizontal-shredded-img.ts'
import VerticalShreddedImg from './vertical-shredded-img.ts'

export default class ShreddedImgManager {
  /**
   * @type {AbstractShreddedImg[]}
   */
  shreddedImgs: AbstractShreddedImg[] = []

  /**
   * @type {HTMLImageElement}
   */
  img: HTMLImageElement

  /**
   * @type {number}
   */
  width: number

  /**
   * @type {number}
   */
  height: number

  /**
   * @type {number}
   */
  spread: number

  /**
   * @type {boolean}
   */
  #isHorizontalCreation: boolean = false

  /**
   * Constructor
   *
   * @param {string} src
   * @param {number} width
   * @param {number} spread
   */
  constructor(src: string, width: number, spread: number = 2) {
    this.img = new Image()
    this.img.src = src
    this.spread = spread
    this.width = width

    this.img.onload = () => {
      const ar = this.img.width / this.img.height
      this.height = width / ar
    }
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    for (const shreddedImg of this.shreddedImgs) {
      shreddedImg.draw(context)
    }
  }

  /**
   * Create shredded images. It is created the even and the odd ones
   *
   * @param   {number} x
   * @param   {number} y
   * @returns {AbstractShreddedImg[]}
   * @note    It is toggle an internal flat to check if it is
   *          the horizontal version turn or vertical version turn
   */
  createShreddedImgs(x: number, y: number): AbstractShreddedImg[] {
    let evenShreddedImg
    let oddShreddedImg

    if (this.#isHorizontalCreation) {
      const stripSize = Math.ceil(this.height * 0.01)

      evenShreddedImg = this.#createHorizontalShreddedImg(true, stripSize, x, y)
      oddShreddedImg = this.#createHorizontalShreddedImg(
        false,
        stripSize,
        x,
        y + stripSize,
      )
    } else {
      const stripSize = Math.ceil(this.width * 0.01)

      evenShreddedImg = this.#createVerticalShreddedImg(true, stripSize, x, y)
      oddShreddedImg = this.#createVerticalShreddedImg(
        false,
        stripSize,
        x + stripSize,
        y,
      )
    }

    this.#isHorizontalCreation = !this.#isHorizontalCreation

    this.shreddedImgs.push(evenShreddedImg)
    this.shreddedImgs.push(oddShreddedImg)
    return [evenShreddedImg, oddShreddedImg]
  }

  /**
   * Create horizontal shredded image
   *
   * @param   {boolean} isEven
   * @param   {number}  stripSize
   * @param   {number}  x
   * @param   {number}  y
   * @returns {HorizontalShreddedImg}
   */
  #createHorizontalShreddedImg(
    isEven: boolean = true,
    stripSize: number,
    x: number = 0,
    y: number = 0,
  ): HorizontalShreddedImg {
    return new HorizontalShreddedImg(
      this.img,
      this.width,
      this.height,
      stripSize,
      this.spread,
      x,
      y,
      isEven,
    )
  }

  /**
   * Create vertical shredded image
   *
   * @param   {boolean} isEven
   * @param   {number}  stripSize
   * @param   {number}  x
   * @param   {number}  y
   * @returns {VerticalShreddedImg}
   */
  #createVerticalShreddedImg(
    isEven: boolean = true,
    stripSize: number,
    x: number = 0,
    y: number = 0,
  ): VerticalShreddedImg {
    return new VerticalShreddedImg(
      this.img,
      this.width,
      this.height,
      stripSize,
      this.spread,
      x,
      y,
      isEven,
    )
  }
}
