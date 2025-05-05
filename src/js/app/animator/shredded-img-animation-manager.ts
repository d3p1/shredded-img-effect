/**
 * @description Animation manager for shredded images
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This is just a class to encapsulate animation logic
 *              related to shredded images
 */
import AnimationManager from './animation-manager.ts'
import AbstractShreddedImg from '../core/abstract-shredded-img.ts'
import {Keyframe} from '../../types'

export default class ShreddedImgAnimationManager extends AnimationManager {
  /**
   * Add keyframes for shredded images
   *
   * @param   {AbstractShreddedImg} evenShreddedImg
   * @param   {AbstractShreddedImg} oddShreddedImg
   * @param   {number}              finalX
   * @param   {number}              finalY
   * @returns {void}
   */
  addKeyframes(
    evenShreddedImg: AbstractShreddedImg,
    oddShreddedImg: AbstractShreddedImg,
    finalX: number,
    finalY: number,
  ): void {
    this.#repeatKeyframe(
      [
        {
          ref: evenShreddedImg,
          x: evenShreddedImg.x,
          y: evenShreddedImg.y,
          spread: evenShreddedImg.spread,
        },
        {
          ref: oddShreddedImg,
          x: oddShreddedImg.x,
          y: oddShreddedImg.y,
          spread: oddShreddedImg.spread,
        },
      ],
      2,
    )

    this.add([
      {
        ref: evenShreddedImg,
        x: evenShreddedImg.x,
        y: evenShreddedImg.y,
        spread: evenShreddedImg.spread,
      },
      {
        ref: oddShreddedImg,
        x: finalX,
        y: finalY,
        spread: oddShreddedImg.spread,
      },
    ])

    this.#repeatKeyframe(
      [
        {
          ref: evenShreddedImg,
          x: evenShreddedImg.x,
          y: evenShreddedImg.y,
          spread: 1,
        },
        {
          ref: oddShreddedImg,
          x: finalX,
          y: finalY,
          spread: 1,
        },
      ],
      2,
    )
  }

  /**
   * Repeat keyframe
   *
   * @param   {object} keyframe
   * @param   {number} times
   * @returns {void}
   */
  #repeatKeyframe(
    keyframe: Keyframe<AbstractShreddedImg>,
    times: number,
  ): void {
    for (let i = 0; i < times; i++) {
      this.add(keyframe)
    }
  }
}
