/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AbstractShreddedImg from './app/core/abstract-shredded-img.ts'
import AnimationManager from './app/animator/shredded-img-animation-manager.ts'
import ShreddedImgManager from './app/core/shredded-img-manager.ts'
import cheetahImg from '../media/images/cheetah.png'

class App {
  /**
   * @type {AnimationManager}
   */
  #animationManagers: AnimationManager[]

  /**
   * @type {ShreddedImgManager[]}
   */
  #shreddedImgManagers: ShreddedImgManager[]

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas: HTMLCanvasElement

  /**
   * @type {number[]}
   */
  #timeByIndex: number[] = [0, 0]

  /**
   * @type {number}
   */
  #time: number = 0

  /**
   * Constructor
   */
  constructor() {
    this.#initCanvas()
    this.#initAnimationManagers()
    this.#initShreddedImgManagers()
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
    const deltaTime = t - this.#time
    this.#clear()
    this.#processAnimations(deltaTime)
    this.#time = t

    requestAnimationFrame((t) => this.#animate(t))
  }

  /**
   * Process animations
   *
   * @param   {number} deltaTime
   * @returns {void}
   * @todo    Improve this logic
   */
  #processAnimations(deltaTime: number): void {
    if (!this.#animationManagers[0].isPaused) {
      this.#processAnimationByIndex(0, 1, deltaTime)
    }

    if (!this.#animationManagers[1].isPaused) {
      this.#processAnimationByIndex(1, 0, deltaTime)
    }
  }

  /**
   * Update animation by index
   *
   * @param   {number} currentIndex
   * @param   {number} nextIndex
   * @param   {number} deltaTime
   * @returns {void}
   */
  #processAnimationByIndex(
    currentIndex: number,
    nextIndex: number,
    deltaTime: number,
  ): void {
    this.#timeByIndex[currentIndex] += deltaTime
    this.#animationManagers[currentIndex].update(
      this.#timeByIndex[currentIndex],
    )
    this.#shreddedImgManagers[currentIndex].draw(this.#context)
    if (
      this.#animationManagers[currentIndex].currentKeyframeIndex ===
      this.#animationManagers[currentIndex].keyframes.length - 1
    ) {
      this.#animationManagers[currentIndex].pause()
      this.#animationManagers[nextIndex].play()
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

    this.#animationManagers[0].play()
    this.#animationManagers[1].pause()
  }

  /**
   * Init vertical image animations
   *
   * @returns {AbstractShreddedImg[]}
   */
  #initVerticalImageAnimations(): AbstractShreddedImg[] {
    const [evenVerticalShreddedImg, oddVerticalShreddedImg] =
      this.#shreddedImgManagers[0].createShreddedImgs(
        cheetahImg,
        this.#canvas.width * 0.2,
        false,
      )

    this.#animationManagers[0].addKeyframes(
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
   * @param   {AbstractShreddedImg[]} shreddedImgs
   * @returns {void}
   * @todo    Improve keyframe `y` location logic
   */
  #initHorizontalImageAnimations(shreddedImgs: AbstractShreddedImg[]): void {
    for (let i = 0; i < shreddedImgs.length; i++) {
      const shreddedImg = shreddedImgs[i]
      const onload = shreddedImg.img.onload
      shreddedImg.img.onload = (e) => {
        if (onload) {
          onload.call(shreddedImg.img, e)
        }

        const src = shreddedImg.canvasImg!.toDataURL()
        const [evenHorizontalShreddedImg, oddHorizontalShreddedImg] =
          this.#shreddedImgManagers[1].createShreddedImgs(
            src,
            shreddedImg.canvasImg!.width * 0.5,
          )

        this.#animationManagers[1].addKeyframes(
          evenHorizontalShreddedImg,
          oddHorizontalShreddedImg,
          0,
          this.#canvas.height * 0.5 * i,
        )
      }
    }
  }

  /**
   * Init shredded image managers
   *
   * @returns {void}
   * @todo    It is generated two shredded image managers,
   *          the first one for vertical shredded images
   *          and the second one for horizontal shredded images.
   *          Improve this logic and related logic
   */
  #initShreddedImgManagers(): void {
    this.#shreddedImgManagers = [
      new ShreddedImgManager(),
      new ShreddedImgManager(),
    ]
  }

  /**
   * Init animation manager
   *
   * @returns {void}
   * @todo    It is generated two animation managers,
   *          the first one for vertical shredded images
   *          and the second one for horizontal shredded images.
   *          Improve this logic and related logic
   */
  #initAnimationManagers(): void {
    this.#animationManagers = [
      new AnimationManager(2000, (t) => t ** 2),
      new AnimationManager(2000, (t) => t ** 2),
    ]
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
