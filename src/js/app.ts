/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
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
    this.#initImageAnimations()

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
      this.#animationManager.update(t)
      this.#shreddedImgManager.draw(this.#context)
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
   * Init image animations
   *
   * @returns {void}
   */
  #initImageAnimations(): void {
    const [evenVerticalShreddedImg, oddVerticalShreddedImg] =
      this.#initVerticalImageAnimations()

    this.#initHorizontalImageAnimations([
      evenVerticalShreddedImg,
      oddVerticalShreddedImg,
    ])
  }

  /**
   * Init vertical image animations
   *
   * @returns {VerticalShreddedImg[]}
   */
  #initVerticalImageAnimations(): VerticalShreddedImg[] {
    const [evenVerticalShreddedImg, oddVerticalShreddedImg] =
      this.#shreddedImgManager.createShreddedImgs(
        cheetahImg,
        this.#canvas.width * 0.2,
        false,
      )

    this.#animationManager.addKeyframes(
      evenVerticalShreddedImg,
      oddVerticalShreddedImg,
      0,
      this.#canvas.height * 0.5,
    )

    return [evenVerticalShreddedImg, oddVerticalShreddedImg]
  }

  /**
   * Init horizontal image animations
   *
   * @param   {VerticalShreddedImg[]} shreddedImgs
   * @returns {void}
   */
  #initHorizontalImageAnimations(shreddedImgs: VerticalShreddedImg[]): void {
    /**
     * @note For each vertical shredded image is generated
     *       a horizontal version
     */
    for (let i = 0; i < shreddedImgs.length; i++) {
      /**
       * @note It is updated the `onload` event of the shredded image
       *       to generate a horizontal version when image is already loaded
       */
      const shreddedImg = shreddedImgs[i]
      const onload = shreddedImg.imgElement.onload
      shreddedImg.imgElement.onload = (e) => {
        if (onload) {
          onload.call(shreddedImg.imgElement, e)
        }

        const [evenHorizontalShreddedImg, oddHorizontalShreddedImg] =
          this.#shreddedImgManager.duplicateShreddedImg(shreddedImg, true)

        this.#animationManager.addKeyframes(
          evenHorizontalShreddedImg,
          oddHorizontalShreddedImg,
          this.#canvas.width * 0.5,
          0,
        )
      }
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
