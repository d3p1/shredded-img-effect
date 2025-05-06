/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Improve shredded image manager and how shredded images are
 *              accessed
 */
import HorizontalShreddedImg from './app/core/horizontal-shredded-img.ts'
import VerticalShreddedImg from './app/core/vertical-shredded-img.ts'
import AnimationManager from './app/animator/shredded-img-animation-manager.ts'
import ShreddedImgManager from './app/core/shredded-img-manager.ts'
import cheetahImg from '../media/images/cheetah.png'

class App {
  /**
   * @type {AnimationManager}
   */
  #animationManager: AnimationManager

  /**
   * @type {ShreddedImgManager}
   */
  #shreddedImgManager: ShreddedImgManager

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initAnimationManager()
    this.#initShreddedImgManager()
    this.#initShreddedImgs()

    this.#animate()
  }

  /**
   * Animate
   *
   * @param   {number} t
   * @returns {void}
   */
  #animate(t: number = 0): void {
    this.#clear()
    this.#update(t)
    requestAnimationFrame((t) => this.#animate(t))
  }

  /**
   * Update
   *
   * @param   {number} t
   * @returns {void}
   */
  #update(t: number): void {
    if (this.#shreddedImgManager.isReady()) {
      if (!this.#animationManager.keyframes.length) {
        /**
         * @note Create animations when images are ready
         */
        this.#animationManager.animateShreddedImgs(
          this.#shreddedImgManager.shreddedImgs[
            'vertical_even'
          ] as VerticalShreddedImg,
          this.#shreddedImgManager.shreddedImgs[
            'vertical_odd'
          ] as VerticalShreddedImg,
          this.#shreddedImgManager.shreddedImgs[
            'vertical_even_horizontal_even'
          ] as HorizontalShreddedImg,
          this.#shreddedImgManager.shreddedImgs[
            'vertical_even_horizontal_odd'
          ] as HorizontalShreddedImg,
          this.#shreddedImgManager.shreddedImgs[
            'vertical_odd_horizontal_even'
          ] as HorizontalShreddedImg,
          this.#shreddedImgManager.shreddedImgs[
            'vertical_odd_horizontal_odd'
          ] as HorizontalShreddedImg,
          this.#canvas.width,
          this.#canvas.height,
        )
      } else {
        /**
         * @note Update shredded images based on animations
         */
        this.#animationManager.update(t)
        this.#shreddedImgManager.draw(this.#context)
      }
    }
  }

  /**
   * Clear
   *
   * @returns {void}
   */
  #clear(): void {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Init shredded images
   *
   * @returns {void}
   */
  #initShreddedImgs(): void {
    this.#initVerticalShreddedImgs()

    this.#initHorizontalShreddedImg(
      this.#shreddedImgManager.shreddedImgs['vertical_even'],
      'vertical_even_horizontal',
    )

    this.#initHorizontalShreddedImg(
      this.#shreddedImgManager.shreddedImgs['vertical_odd'],
      'vertical_odd_horizontal',
    )
  }

  /**
   * Init vertical shredded images
   *
   * @returns {void}
   */
  #initVerticalShreddedImgs(): void {
    this.#shreddedImgManager.createShreddedImgs(
      cheetahImg,
      this.#canvas.width * 0.2,
      'vertical',
      false,
    )
  }

  /**
   * Init horizontal shredded images from vertical shredded image
   *
   * @param   {VerticalShreddedImg} shreddedImg
   * @param   {string}              id
   * @returns {void}
   */
  #initHorizontalShreddedImg(
    shreddedImg: VerticalShreddedImg,
    id: string,
  ): void {
    /**
     * @note It is updated the `onload` event of the shredded image
     *       to generate a horizontal version when image is already loaded
     */
    const onload = shreddedImg.imgElement.onload
    shreddedImg.imgElement.onload = (e) => {
      if (onload) {
        onload.call(shreddedImg.imgElement, e)
      }

      this.#shreddedImgManager.duplicateShreddedImg(shreddedImg, id, true)
    }
  }

  /**
   * Init shredded image manager
   *
   * @returns {void}
   */
  #initShreddedImgManager(): void {
    this.#shreddedImgManager = new ShreddedImgManager()
  }

  /**
   * Init animation manager
   *
   * @returns {void}
   */
  #initAnimationManager(): void {
    this.#animationManager = new AnimationManager(2000, (t) => t ** 2)
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas(): void {
    this.#canvas = document.createElement('canvas')
    this.#context = this.#canvas.getContext('2d') as CanvasRenderingContext2D

    this.#canvas.width = window.innerWidth
    this.#canvas.height = window.innerHeight
    document.body.appendChild(this.#canvas)
  }
}
new App()
