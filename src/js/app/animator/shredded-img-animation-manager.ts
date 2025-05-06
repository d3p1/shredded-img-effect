/**
 * @description Animation manager for shredded images
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        This is just a class to encapsulate animation logic
 *              related to shredded images.
 *              Improve methods
 * @todo        We are going to play with the alpha to hide images
 *              and only show them when it is necessary.
 *              Improve this behaviour
 */
import VerticalShreddedImg from '../core/vertical-shredded-img.ts'
import HorizontalShreddedImg from '../core/horizontal-shredded-img.ts'
import AnimationManager from './animation-manager.ts'
import {ShreddedImageKeyframe} from '../../types'

export default class ShreddedImgAnimationManager extends AnimationManager {
  /**
   * Animate shredded images
   *
   * @param   {VerticalShreddedImg}   evenVerticalShreddedImg
   * @param   {VerticalShreddedImg}   oddVerticalShreddedImg
   * @param   {HorizontalShreddedImg} evenHorizontalShreddedImgForEvenVertical
   * @param   {HorizontalShreddedImg} oddHorizontalShreddedImgForEvenVertical
   * @param   {HorizontalShreddedImg} evenHorizontalShreddedImgForOddVertical
   * @param   {HorizontalShreddedImg} oddHorizontalShreddedImgForOddVertical
   * @param   {number}                canvasWidth
   * @param   {number}                canvasHeight
   * @returns {void}
   */
  animateShreddedImgs(
    evenVerticalShreddedImg: VerticalShreddedImg,
    oddVerticalShreddedImg: VerticalShreddedImg,
    evenHorizontalShreddedImgForEvenVertical: HorizontalShreddedImg,
    oddHorizontalShreddedImgForEvenVertical: HorizontalShreddedImg,
    evenHorizontalShreddedImgForOddVertical: HorizontalShreddedImg,
    oddHorizontalShreddedImgForOddVertical: HorizontalShreddedImg,
    canvasWidth: number,
    canvasHeight: number,
  ): void {
    if (
      evenVerticalShreddedImg.img &&
      oddVerticalShreddedImg.img &&
      evenHorizontalShreddedImgForEvenVertical.img &&
      oddHorizontalShreddedImgForEvenVertical.img &&
      evenHorizontalShreddedImgForOddVertical.img &&
      oddHorizontalShreddedImgForOddVertical.img
    ) {
      this.#repeatKeyframe(
        [
          {
            ref: evenVerticalShreddedImg,
            x: 0,
            y: 0,
            spread: 2,
            alpha: 1,
          },
          {
            ref: oddVerticalShreddedImg,
            x: oddVerticalShreddedImg.stripSize,
            y: 0,
            spread: 2,
            alpha: 1,
          },
          {
            ref: evenHorizontalShreddedImgForEvenVertical,
            x: 0,
            y: 0,
            spread: evenHorizontalShreddedImgForEvenVertical.spread,
            alpha: 0,
          },
          {
            ref: oddHorizontalShreddedImgForEvenVertical,
            x: 0,
            y: 0,
            spread: oddHorizontalShreddedImgForEvenVertical.spread,
            alpha: 0,
          },
          {
            ref: evenHorizontalShreddedImgForOddVertical,
            x: 0,
            y: canvasHeight - oddVerticalShreddedImg.img.height,
            spread: evenHorizontalShreddedImgForOddVertical.spread,
            alpha: 0,
          },
          {
            ref: oddHorizontalShreddedImgForOddVertical,
            x: 0,
            y: canvasHeight - oddVerticalShreddedImg.img.height,
            spread: oddHorizontalShreddedImgForOddVertical.spread,
            alpha: 0,
          },
        ],
        2,
      )

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: evenHorizontalShreddedImgForEvenVertical.spread,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: oddHorizontalShreddedImgForEvenVertical.spread,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: evenHorizontalShreddedImgForOddVertical.spread,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: oddHorizontalShreddedImgForOddVertical.spread,
          alpha: 0,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 1,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: evenHorizontalShreddedImgForEvenVertical.spread,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: oddHorizontalShreddedImgForEvenVertical.spread,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: evenHorizontalShreddedImgForOddVertical.spread,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: oddHorizontalShreddedImgForOddVertical.spread,
          alpha: 0,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 1,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: oddHorizontalShreddedImgForEvenVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y:
            canvasHeight -
            oddVerticalShreddedImg.img.height +
            oddHorizontalShreddedImgForOddVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 0,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: oddHorizontalShreddedImgForEvenVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y:
            canvasHeight -
            oddVerticalShreddedImg.img.height +
            oddHorizontalShreddedImgForOddVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 0,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x:
            canvasWidth -
            evenVerticalShreddedImg.strips.length *
              evenVerticalShreddedImg.stripSize,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x:
            canvasWidth -
            oddVerticalShreddedImg.strips.length *
              oddVerticalShreddedImg.stripSize,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
      ])

      this.#repeatKeyframe(
        [
          {
            ref: evenVerticalShreddedImg,
            x: 0,
            y: 0,
            spread: 1,
            alpha: 0,
          },
          {
            ref: oddVerticalShreddedImg,
            x: 0,
            y: canvasHeight - oddVerticalShreddedImg.img.height,
            spread: 1,
            alpha: 0,
          },
          {
            ref: evenHorizontalShreddedImgForEvenVertical,
            x: 0,
            y: 0,
            spread: 1,
            alpha: 1,
          },
          {
            ref: oddHorizontalShreddedImgForEvenVertical,
            x:
              canvasWidth -
              evenVerticalShreddedImg.strips.length *
                evenVerticalShreddedImg.stripSize,
            y: 0,
            spread: 1,
            alpha: 1,
          },
          {
            ref: evenHorizontalShreddedImgForOddVertical,
            x: 0,
            y: canvasHeight - oddVerticalShreddedImg.img.height,
            spread: 1,
            alpha: 1,
          },
          {
            ref: oddHorizontalShreddedImgForOddVertical,
            x:
              canvasWidth -
              oddVerticalShreddedImg.strips.length *
                oddVerticalShreddedImg.stripSize,
            y: canvasHeight - oddVerticalShreddedImg.img.height,
            spread: 1,
            alpha: 1,
          },
        ],
        2,
      )

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 0,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: oddHorizontalShreddedImgForEvenVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y:
            canvasHeight -
            oddVerticalShreddedImg.img.height +
            oddHorizontalShreddedImgForOddVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 1,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: oddHorizontalShreddedImgForEvenVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 1,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y:
            canvasHeight -
            oddVerticalShreddedImg.img.height +
            oddHorizontalShreddedImgForOddVertical.stripSize,
          spread: 2,
          alpha: 1,
        },
      ])

      this.add([
        {
          ref: evenVerticalShreddedImg,
          x: 0,
          y: 0,
          spread: 1,
          alpha: 1,
        },
        {
          ref: oddVerticalShreddedImg,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 1,
          alpha: 1,
        },
        {
          ref: evenHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: 0,
          spread: 2,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForEvenVertical,
          x: 0,
          y: oddHorizontalShreddedImgForEvenVertical.stripSize,
          spread: 2,
          alpha: 0,
        },
        {
          ref: evenHorizontalShreddedImgForOddVertical,
          x: 0,
          y: canvasHeight - oddVerticalShreddedImg.img.height,
          spread: 2,
          alpha: 0,
        },
        {
          ref: oddHorizontalShreddedImgForOddVertical,
          x: 0,
          y:
            canvasHeight -
            oddVerticalShreddedImg.img.height +
            oddHorizontalShreddedImgForOddVertical.stripSize,
          spread: 2,
          alpha: 0,
        },
      ])
    }
  }

  /**
   * Repeat keyframe
   *
   * @param   {object} keyframe
   * @param   {number} times
   * @returns {void}
   */
  #repeatKeyframe(keyframe: ShreddedImageKeyframe, times: number): void {
    for (let i = 0; i < times; i++) {
      this.add(keyframe)
    }
  }
}
