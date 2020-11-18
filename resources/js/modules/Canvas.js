import EventEmitter from 'events';

const BASE_WIDTH = 800;
const BASE_HEIGHT = 450;
const RATIO = 500 / 338;

export default class Canvas extends EventEmitter {
  constructor(element) {
    super();
    this.element = element;
    this.$el = document.querySelector(element);
    this.$tweetImageArea = this.$el.querySelector('.tweet-box-img img');
    this.canvas = this.$el.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    this.messagePosition = { x: 0, y: 0 };
    this.followerPosition = { x: 0, y: 0 };

    this.windowWidth = window.innerWidth;

    this.width = 338;
    this.height = 500;

    this.canvas.width = this.width * 2;
    this.canvas.height = this.width * RATIO * 2;

    this.drawImage = null;
    this.drawMessage = ['お年玉ください！'];
    this.imageUrl = '';
    this.imageIndex = 0;
    this.addEvent();
  }

  addEvent() {
    this.width = 338;
    this.height = this.width * RATIO * 2;
    this.canvas.width = this.width * 2;
    this.canvas.height = this.width * RATIO * 2;
    this.canvas.style.width = `${this.width}px`;
    this.init();
  }

  /**
   * 初期化
   */
  init() {
    this.updateImage();
    this.draw();
    console.log(555);
  }

  /**
   * 感想テキストの位置を更新
   */
  updateMessagePosition() {
    this.messagePosition.x = this.width * (215 / BASE_WIDTH) * 2;
    this.messagePosition.y = 170 * 2;
  }

  /**
   * 背景画像の更新
   * @param {*} image
   */
  updateImage() {
    console.log(555);
    const imageUrl = '/images/image.jpg';
    this.imageIndex = 0;
    this.drawImage = new Image();
    this.drawImage.src = imageUrl;
    this.drawImage.onload = () => {
      this.draw();
    };
  }

  /**
   * テキストの更新
   * @param {*} message
   */
  updateMessage(message) {
    this.drawMessage = message;
    this.draw();
  }

  drawMessages() {
    if (this.drawMessage.length) {
      this.messagePosition.y = this.height * (110 / BASE_HEIGHT) * 2;

      const messageMeasure = [];
      const positionX = this.width * (350 / BASE_WIDTH) * 2;
      this.drawMessage.forEach((message, index) => {
        messageMeasure.push(this.context.measureText(message).width);
        this.messagePosition.x =
          this.width * (290 / 591) -
          Math.max(...messageMeasure) / 2 +
          positionX;
        this.context.fillText(
          message,
          this.messagePosition.x,
          this.messagePosition.y
        );
      });
    }
  }

  checkMessage(message) {
    return this.context.measureText(message), message.length;
  }

  /**
   * 画像の描画
   */
  draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.drawImage(this.drawImage, 0, 0, this.width * 2, this.height);
    this.context.fillStyle = 'black';
    this.context.font = `bold 40px Hiragino Kaku Gothic ProN`;
    this.drawMessages();
    this.$tweetImageArea.src = this.canvas.toDataURL('image/jpeg');
  }
}
