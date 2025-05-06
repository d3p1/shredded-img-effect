/**
 * @description Horizontal shredded image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import AbstractShreddedImg from './abstract-shredded-img.ts'

export default class HorizontalShreddedImg extends AbstractShreddedImg {
  /**
   * {@inheritDoc}
   * @note Because horizontal strips are being generated as vertical strips,
   *       we must rotate them to generate image in its original orientation
   * @see  _drawStrip()
   */
  draw(context: CanvasRenderingContext2D): void {
    context.save()
    context.rotate(Math.PI / 2)
    super.draw(context)
    context.restore()
  }

  /**
   * {@inheritDoc}
   */
  protected _drawStrip(
    context: CanvasRenderingContext2D,
    strip: HTMLCanvasElement,
    index: number,
  ): void {
    const x = this.y + this.stripSize * index * this.spread
    context.drawImage(strip, x, -this.x, strip.width, -strip.height)
  }

  /**
   * {@inheritDoc}
   * @note By default, images are being generated as vertical stripped images.
   *       We are going to flip the image so horizontal strips are being
   *       generated as vertical strips
   */
  protected _initImg(img: HTMLImageElement, width: number): void {
    super._initImg(img, width)

    if (this.img) {
      const w = this.img.width
      const h = this.img.height
      this.img.width = h
      this.img.height = w

      const context = this.img.getContext('2d') as CanvasRenderingContext2D
      context.save()
      context.rotate(-Math.PI / 2)
      context.drawImage(this.img, 0, 0, -w, h)
      context.restore()
    }
  }
}
