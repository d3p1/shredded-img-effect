/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AnimationManager from './app/animator/animation-manager.ts'
import AbstractShreddedImg from './app/core/abstract-shredded-img.ts'
import VerticalShreddedImg from './app/core/vertical-shredded-img.ts'
import cheetahImg from '../media/images/cheetah.png'

class App {
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
   * @type {VerticalShreddedImg | null}
   */
  #evenVerticalShreddedImg: VerticalShreddedImg | null = null

  /**
   * @type {VerticalShreddedImg | null}
   */
  #oddVerticalShreddedImg: VerticalShreddedImg | null = null

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initAnimationManager()
    this.#initVerticalShreddedImgs()

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
    this.#draw(t)
    requestAnimationFrame(this.#animate.bind(this))
  }

  /**
   * Draw
   *
   * @param   {number} t
   * @returns {void}
   */
  #draw(t: number): void {
    if (this.#animationManager.keyframes.length) {
      this.#animationManager.play(t)
    }

    if (this.#evenVerticalShreddedImg) {
      this.#evenVerticalShreddedImg.draw(this.#context)
    }

    if (this.#oddVerticalShreddedImg) {
      this.#oddVerticalShreddedImg.draw(this.#context)
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
   * Init vertical shredded images
   *
   * @returns {void}
   */
  #initVerticalShreddedImgs(): void {
    const img = new Image()
    img.src = cheetahImg

    img.onload = () => {
      const width = this.#canvas.width * 0.2
      const ar = img.width / img.height
      const height = width / ar
      const stripSize = Math.ceil(width * 0.01)
      const spread = 2

      this.#evenVerticalShreddedImg = this.#createVerticalShreddedImg(
        img,
        width,
        height,
        true,
        stripSize,
        0,
        0,
        spread,
      )
      this.#oddVerticalShreddedImg = this.#createVerticalShreddedImg(
        img,
        width,
        height,
        false,
        stripSize,
        stripSize,
        0,
        spread,
      )

      this.#animationManager.add([
        {
          ref: this.#oddVerticalShreddedImg,
          y: 0,
          x: this.#oddVerticalShreddedImg.x,
          spread: spread,
        },
        {
          ref: this.#evenVerticalShreddedImg,
          y: 0,
          x: 0,
          spread: spread,
        },
      ])
      this.#animationManager.add([
        {
          ref: this.#oddVerticalShreddedImg,
          y: 0,
          x: this.#oddVerticalShreddedImg.x,
          spread: spread,
        },
        {
          ref: this.#evenVerticalShreddedImg,
          y: 0,
          x: 0,
          spread: spread,
        },
      ])
      this.#animationManager.add([
        {
          ref: this.#oddVerticalShreddedImg,
          y: this.#canvas.height - height,
          x: this.#oddVerticalShreddedImg.x,
          spread: spread,
        },
        {
          ref: this.#evenVerticalShreddedImg,
          y: 0,
          x: 0,
          spread: spread,
        },
      ])
      this.#animationManager.add([
        {
          ref: this.#oddVerticalShreddedImg,
          y: this.#canvas.height - height,
          x: 0,
          spread: 1,
        },
        {
          ref: this.#evenVerticalShreddedImg,
          y: 0,
          x: 0,
          spread: 1,
        },
      ])
      this.#animationManager.add([
        {
          ref: this.#oddVerticalShreddedImg,
          y: this.#canvas.height - height,
          x: 0,
          spread: 1,
        },
        {
          ref: this.#evenVerticalShreddedImg,
          y: 0,
          x: 0,
          spread: 1,
        },
      ])
    }
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

  /**
   * Create vertical shredded image
   *
   * @param   {HTMLImageElement} img
   * @param   {number}           width
   * @param   {number}           height
   * @param   {boolean}          isEven
   * @param   {number}           stripSize
   * @param   {number}           x
   * @param   {number}           y
   * @param   {number}           spread
   * @returns {AbstractShreddedImg}
   */
  #createVerticalShreddedImg(
    img: HTMLImageElement,
    width: number,
    height: number,
    isEven: boolean = true,
    stripSize: number,
    x: number = 0,
    y: number = 0,
    spread: number = 2,
  ): AbstractShreddedImg {
    return new VerticalShreddedImg(
      img,
      width,
      height,
      stripSize,
      spread,
      x,
      y,
      isEven,
    )
  }
}
new App()
