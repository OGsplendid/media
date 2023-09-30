import moment from 'moment/moment';

export default class Memory {
  constructor() {
    this.wrapper = document.querySelector('.wrapper');
  }

  static createPost(obj) {
    const html = `
      <div class="post text-post">
        <p class="text">${obj.text}</p>
        <time class="time">${obj.time}</time>
        <footer class="coordinates">${obj.coordinates}</footer>
      </div>
    `;
    return html;
  }

  async addPost(text) {
    let coords = await Memory.getCoords();
    if (coords) {
      const obj = {
        text,
        time: Memory.getTime(),
        coords,
      };
      const post = Memory.createPost(obj);
      this.wrapper.insertAdjacentHTML('afterbegin', post);
    } else {
      coords = await Memory.askForCoords();
      const obj = {
        text,
        time: Memory.getTime(),
        coords,
      };
      const post = Memory.createPost(obj);
      this.wrapper.insertAdjacentHTML('afterbegin', post);
    }
  }

  static getTime() {
    return moment().format('DD.MM.YYYY HH:mm');
  }

  static async getCoords() {
    let coords;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;
        coords = `${latitude}, ${longitude}`;
      }, async (err) => {
        console.log(err);
      });
    }
    return coords;
  }

  static askForCoords() {
    let coords;
    const popup = document.querySelector('.popup');
    const popupForm = popup.querySelector('.coords-form');
    const closeButton = popupForm.querySelector('.close-button');
    popup.classList.remove('hidden');
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = popupForm.querySelector('.coords-input').value;
      const cleanData = data.trim();
      if (!cleanData) {
        return null;
      }
      coords = cleanData;
      popupForm.reset();
      popup.classList.add('hidden');
      return coords;
    });
    closeButton.addEventListener('click', () => {
      popupForm.reset();
      popup.classList.add('hidden');
    });
  }
}
