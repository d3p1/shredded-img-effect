/**
 * @description Shredded image manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AbstractShreddedImg from './abstract-shredded-img.ts'
import HorizontalShreddedImg from './horizontal-shredded-img.ts'
import VerticalShreddedImg from './vertical-shredded-img.ts'

/**
 * @const {string}
 */
const ID_EVEN_SUFFIX = '_even'

/**
 * @const {string}
 */
const ID_ODD_SUFFIX = '_odd'

export default class ShreddedImgManager {
  /**
   * @type {{[id: string]: AbstractShreddedImg}}
   */
  shreddedImgs: {[id: string]: AbstractShreddedImg}

  /**
   * @type {number}
   */
  stripSize: number

  /**
   * Constructor
   *
   * @param {number} stripSize
   */
  constructor(stripSize: number = 5) {
    this.stripSize = stripSize
  }

  /**
   * Check if all generated images are loaded
   *
   * @returns {boolean}
   */
  isReady(): boolean {
    for (const id in this.shreddedImgs) {
      const shreddedImg = this.shreddedImgs[id]
      if (!shreddedImg.imgElement.complete) {
        return false
      }
    }
    return true
  }

  /**
   * Draw
   *
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   */
  draw(context: CanvasRenderingContext2D): void {
    for (const id in this.shreddedImgs) {
      const shreddedImg = this.shreddedImgs[id]
      shreddedImg.draw(context)
    }
  }

  /**
   * Duplicate given shredded image
   *
   * @param   {AbstractShreddedImg} shreddedImg
   * @param   {string}              id
   * @param   {boolean}             isHorizontalCreation
   * @returns {void}
   */
  duplicateShreddedImg(
    shreddedImg: AbstractShreddedImg,
    id: string,
    isHorizontalCreation: boolean,
  ): void {
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

      this.createShreddedImgs(
        canvas.toDataURL('image/png'),
        canvas.width,
        id,
        isHorizontalCreation,
      )
    }
  }

  /**
   * Create shredded images.
   * It is created the even and the odd ones
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {string}  id
   * @param   {boolean} isHorizontalCreation
   * @returns {void}
   */
  createShreddedImgs(
    src: string,
    width: number,
    id: string,
    isHorizontalCreation: boolean = true,
  ): void {
    let evenShreddedImg
    let oddShreddedImg

    if (isHorizontalCreation) {
      evenShreddedImg = this.#createHorizontalShreddedImg(src, width, true)
      oddShreddedImg = this.#createHorizontalShreddedImg(src, width, false)
    } else {
      evenShreddedImg = this.#createVerticalShreddedImg(src, width, true)
      oddShreddedImg = this.#createVerticalShreddedImg(src, width, false)
    }

    this.shreddedImgs = {
      [id + ID_EVEN_SUFFIX]: evenShreddedImg,
      ...this.shreddedImgs,
    }
    this.shreddedImgs = {
      [id + ID_ODD_SUFFIX]: oddShreddedImg,
      ...this.shreddedImgs,
    }
  }

  /**
   * Create horizontal shredded image
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isEven
   * @returns {HorizontalShreddedImg}
   */
  #createHorizontalShreddedImg(
    src: string,
    width: number,
    isEven: boolean = true,
  ): HorizontalShreddedImg {
    return new HorizontalShreddedImg(src, width, this.stripSize, isEven)
  }

  /**
   * Create vertical shredded image
   *
   * @param   {string}  src
   * @param   {number}  width
   * @param   {boolean} isEven
   * @returns {VerticalShreddedImg}
   */
  #createVerticalShreddedImg(
    src: string,
    width: number,
    isEven: boolean = true,
  ): VerticalShreddedImg {
    return new VerticalShreddedImg(src, width, this.stripSize, isEven)
  }
}
