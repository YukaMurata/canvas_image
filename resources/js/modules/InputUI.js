import EventEmitter from 'events';

export default class InputUI extends EventEmitter {
  constructor() {
    super();
    this.$input = document.querySelector('input');

    this.bind();
  }

  bind() {
    this.$input.addEventListener('input', e => {
      this.emit('inputMessage', e.currentTarget.value);
    });
  }
}
