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
   * Check if all generated images are loaded
   *
   * @returns {boolean}
   */
  isReady(): boolean {
    return this.shreddedImgs.every(
      (shreddedImg) => shreddedImg.imgElement.complete,
    )
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
   * Duplicate given shredded image
   *
   * @param   {AbstractShreddedImg} shreddedImg
   * @param   {boolean}             isHorizontalCreation
   * @returns {AbstractShreddedImg[]}
   */
  duplicateShreddedImg(
    shreddedImg: AbstractShreddedImg,
    isHorizontalCreation: boolean,
  ): AbstractShreddedImg[] {
    /**
     * @note It is persisted image strips in a canvas and then
     *       is generated shredded image from this canvas
     * @note Take into consideration that canvas will be generated
     *       with the double of its width because it is drawn only
     *       the even or odd strips, but because we are generating
     *       the image source as `png`, the empty parts/strips will be
     *       transparent
     * @note It is updated the spread to 1 to build compact image
     *       from strips
     */
    if (shreddedImg.img) {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d') as CanvasRenderingContext2D
      canvas.width = shreddedImg.img.width
      canvas.height = shreddedImg.img.height

      const oldSpread = shreddedImg.spread
      shreddedImg.spread = 1
      shreddedImg.draw(context)
      shreddedImg.spread = oldSpread

      return this.createShreddedImgs(
        canvas.toDataURL('image/png'),
        canvas.width,
        isHorizontalCreation,
      )
    }

    return []
  }

  /**
   * Create shredded images.
   * It is created the even and the odd ones,
   * and they are reassembled
   * (it is offset the `x`/`y` coordinate of the odd ones)
   * to build the original image
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isHorizontalCreation
   * @returns {AbstractShreddedImg[]}
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
