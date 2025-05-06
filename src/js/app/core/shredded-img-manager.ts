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
   * @type {number}
   */
  stripSize: number

  /**
   * @type {number}
   */
  spread: number

  /**
   * Constructor
   *
   * @param {number} stripSize
   * @param {number} spread
   */
  constructor(stripSize: number = 5, spread: number = 2) {
    this.stripSize = stripSize
    this.spread = spread
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
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isHorizontalCreation
   * @returns {AbstractShreddedImg[]}
   * @note    It is toggle a flag to check if it is
   *          the horizontal version turn or vertical version turn
   */
  createShreddedImgs(
    src: string,
    width: number,
    isHorizontalCreation: boolean = true,
  ): AbstractShreddedImg[] {
    let evenShreddedImg
    let oddShreddedImg

    if (isHorizontalCreation) {
      evenShreddedImg = this.#createHorizontalShreddedImg(src, width, true)
      oddShreddedImg = this.#createHorizontalShreddedImg(src, width, false)
      oddShreddedImg.y += oddShreddedImg.stripSize
    } else {
      evenShreddedImg = this.#createVerticalShreddedImg(src, width, true)
      oddShreddedImg = this.#createVerticalShreddedImg(src, width, false)
      oddShreddedImg.x += oddShreddedImg.stripSize
    }

    this.shreddedImgs.push(evenShreddedImg)
    this.shreddedImgs.push(oddShreddedImg)
    return [evenShreddedImg, oddShreddedImg]
  }

  /**
   * Create horizontal shredded image
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isEven
   * @param   {number}  x
   * @param   {number}  y
   * @returns {HorizontalShreddedImg}
   */
  #createHorizontalShreddedImg(
    src: string,
    width: number,
    isEven: boolean = true,
    x: number = 0,
    y: number = 0,
  ): HorizontalShreddedImg {
    return new HorizontalShreddedImg(
      src,
      width,
      this.stripSize,
      this.spread,
      x,
      y,
      isEven,
    )
  }

  /**
   * Create vertical shredded image
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isEven
   * @param   {number}  x
   * @param   {number}  y
   * @returns {VerticalShreddedImg}
   */
  #createVerticalShreddedImg(
    src: string,
    width: number,
    isEven: boolean = true,
    x: number = 0,
    y: number = 0,
  ): VerticalShreddedImg {
    return new VerticalShreddedImg(
      src,
      width,
      this.stripSize,
      this.spread,
      x,
      y,
      isEven,
    )
  }
}
