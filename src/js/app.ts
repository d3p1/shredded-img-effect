/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Img from './app/core/img.ts'
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
   * @type {Img | null}
   */
  #img: Img | null = null

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initImg()

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
    if (this.#img) {
      this.#img.draw(this.#context, 0, 0)
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
  #initImg(): void {
    const img = new Image()
    img.src = cheetahImg

    img.onload = () => {
      const width = this.#canvas.width * 0.2
      const ar = img.width / img.height
      const height = width / ar
      this.#img = new Img(img, width, height)
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
