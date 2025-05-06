/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AnimationManager from './app/animator/shredded-img-animation-manager.ts'
import ShreddedImgManager from './app/core/shredded-img-manager.ts'
import cheetahImg from '../media/images/cheetah.png'

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
    this.#processAnimations(t)
    this.#draw()

    requestAnimationFrame((t) => this.#animate(t))
  }

  /**
   * Process animations
   *
   * @param   {number} t
   * @returns {void}
   */
  #processAnimations(t: number): void {
    if (this.#animationManager.keyframes.length) {
      this.#animationManager.play(t)
    }
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
   * Init image animations
   *
   * @returns {void}
   */
  #initImageAnimations(): void {
    const [evenShreddedImg, oddShreddedImg] =
      this.#shreddedImgManager.createShreddedImgs(
        cheetahImg,
        this.#canvas.width * 0.2,
      )

    if (this.#shreddedImgManager.isHorizontalCreation) {
      this.#animationManager.addKeyframes(
        evenShreddedImg,
        oddShreddedImg,
        this.#canvas.width * 0.5,
        0,
      )
    } else {
      this.#animationManager.addKeyframes(
        evenShreddedImg,
        oddShreddedImg,
        0,
        this.#canvas.height * 0.5,
      )
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
