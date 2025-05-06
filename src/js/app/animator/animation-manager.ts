/**
 * @description Animation manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Mathy from '../../utils/mathy.ts'
import {ShreddedImage, Keyframe} from '../../types'

export default class AnimationManager {
  /**
   * @type {Array<{ref: ShreddedImage} & object>[]}
   */
  keyframes: Keyframe<ShreddedImage>[] = []

  /**
   * @type {number}
   */
  currentKeyframeIndex: number = 0

  /**
   * @type {number}
   */
  nextKeyframeIndex: number = 0

  /**
   * @type {boolean}
   */
  isPaused: boolean = false

  /**
   * @type {(t: number) => number}
   */
  readonly #easing: (t: number) => number

  /**
   * @type {number}
   */
  readonly #duration: number

  /**
   * Constructor
   *
   * @param {number}                duration
   * @param {(t: number) => number} easing
   */
  constructor(
    duration: number,
    easing: (t: number) => number = (t: number) => t,
  ) {
    this.#easing = easing
    this.#duration = duration
  }

  /**
   * Pause
   *
   * @returns {void}
   */
  pause(): void {
    this.isPaused = true
  }

  /**
   * Play
   *
   * @returns {void}
   */
  play(): void {
    this.isPaused = false
  }

  /**
   * Update
   *
   * @param   {number} time
   * @returns {void}
   * @todo    Improve how properties are processed
   * @todo    Improve how property types are managed
   */
  update(time: number = 0): void {
    if (!this.isPaused) {
      this.currentKeyframeIndex =
        Math.floor(time / this.#duration) % this.keyframes.length
      this.nextKeyframeIndex =
        (this.currentKeyframeIndex + 1) % this.keyframes.length

      const currentKeyframe = this.keyframes[this.currentKeyframeIndex]
      const nextKeyframe = this.keyframes[this.nextKeyframeIndex]
      const t = this.#easing((time % this.#duration) / this.#duration)

      for (let i = 0; i < currentKeyframe.length; i++) {
        const {ref, ...properties} = currentKeyframe[i]
        for (const property in properties) {
          const startValue = currentKeyframe[i][property as keyof ShreddedImage]
          const endValue = nextKeyframe[i][property as keyof ShreddedImage]

          if (startValue !== undefined && endValue !== undefined) {
            ref[property as keyof ShreddedImage] = Mathy.lerp(
              startValue,
              endValue,
              t,
            )
          }
        }
      }
    }
  }

  /**
   * Add keyframe
   *
   * @param   {Array<{ref: ShreddedImage} & object>} keyframe
   * @returns {void}
   */
  add(keyframe: Keyframe<ShreddedImage>): void {
    this.keyframes.push(keyframe)
  }
}
