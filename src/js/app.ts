/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AnimationManager from './app/animator/shredded-img-animation-manager.ts'
import ShreddedImgManager from './app/core/shredded-img-manager.ts'
import cheetahImg from '../media/images/cheetah.png'

/**
 * @const {number}
 * @note  For each image we have five animation frames:
 *        Two to define its initial state,
 *        One to separate them,
 *        Two to define its final state where each strip is joined
 */
const MAX_ANIMATION_KEYFRAMES = 5

class App {
  /**
   * @type {ShreddedImgManager}
   */
  #shreddedImgManager: ShreddedImgManager

  /**
   * @type {AnimationManager}
   */
  #animationManager: AnimationManager

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

    this.#animate()
  }

  /**
   * Animate
   *
   * @param   {number} t
   * @returns {void}
   */
  #animate(t: number = 0): void {
    if (this.#shreddedImgManager.img.complete) {
      this.#clear()
      this.#processAnimations(t)
      this.#draw()
    }

    requestAnimationFrame(this.#animate.bind(this))
  }

  /**
   * Process animations
   *
   * @param   {number} t
   * @returns {void}
   * @todo    For now, we are limiting the number of keyframes
   *          to generate animation just for the vertical strips
   *          and the horizontal ones.
   *          Adapt logic so it is possible to generate more and more
   *          animated and shredded images,
   *          until there is no more space in canvas
   */
  #processAnimations(t: number): void {
    /**
     * @note Every time animation cycle will finish,
     *       it is added a new animation cycle
     */
    if (
      this.#animationManager.nextKeyframeIndex === 0 &&
      this.#animationManager.keyframes.length < MAX_ANIMATION_KEYFRAMES
    ) {
      this.#addImageAnimations()
    }

    if (this.#animationManager.keyframes.length) {
      this.#animationManager.play(t)
    }
  }

  /**
   * Add shredded image animations
   *
   * @returns {void}
   */
  #addImageAnimations(): void {
    const [evenShreddedImg, oddShreddedImg] =
      this.#shreddedImgManager.createShreddedImgs(0, 0)

    this.#animationManager.addKeyframes(
      evenShreddedImg,
      oddShreddedImg,
      0,
      this.#canvas.height - this.#shreddedImgManager.height,
    )
  }

  /**
   * Draw
   *
   * @returns {void}
   */
  #draw(): void {
    this.#shreddedImgManager.draw(this.#context)
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
   * Init shredded image manager
   *
   * @returns {void}
   */
  #initShreddedImgManager(): void {
    this.#shreddedImgManager = new ShreddedImgManager(
      cheetahImg,
      this.#canvas.width * 0.2,
    )
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
