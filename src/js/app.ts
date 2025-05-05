/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import VerticalShreddedImg from './app/core/vertical-shredded-img.ts'
import HorizontalShreddedImg from './app/core/horizontal-shredded-img.ts'
import cheetahImg from '../media/images/cheetah.png'

class App {
  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * @type {VerticalShreddedImg | null}
   */
  #verticalShreddedImg: VerticalShreddedImg | null = null

  /**
   * @type {HorizontalShreddedImg | null}
   */
  #horizontalShreddedImg: HorizontalShreddedImg | null = null

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initShreddedImg()

    this.#animate()
  }

  /**
   * Animate
   *
   * @returns {void}
   */
  #animate(): void {
    this.#clear()
    this.#draw()
    requestAnimationFrame(this.#animate.bind(this))
  }

  /**
   * Draw
   *
   * @returns {void}
   */
  #draw(): void {
    if (this.#verticalShreddedImg) {
      this.#verticalShreddedImg.draw(this.#context)
    }

    if (this.#horizontalShreddedImg) {
      this.#horizontalShreddedImg.draw(this.#context)
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
   * Init image
   *
   * @returns {void}
   */
  #initShreddedImg(): void {
    const img = new Image()
    img.src = cheetahImg

    img.onload = () => {
      const width = this.#canvas.width * 0.2
      const ar = img.width / img.height
      const height = width / ar

      this.#verticalShreddedImg = new VerticalShreddedImg(
        img,
        width,
        height,
        width * 0.1,
        1,
        0,
        0,
      )

      this.#horizontalShreddedImg = new HorizontalShreddedImg(
        img,
        width,
        height,
        height * 0.1,
        1,
        0,
        500,
      )
    }
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
