import moment from 'moment/moment';

export default class Memory {
  constructor() {
    this.memory = [];
    this.coords = null;
  }

  static createPost(obj) {
    let html;
    if (obj.id === 0) {
      html = `
        <div class="post text-post">
          <p class="text">${obj.text}</p>
          <time class="time">${obj.time}</time>
          <footer class="coordinates">${obj.coordinates}</footer>
        </div>
      `;
    }
    // if (obj.id === 1) {
    //   html = `
    //     <div class="post audio-post">
    //       <audio class="audio-player" controls></audio>
    //       <p class="time">${obj.time}</p>
    //       <span class="coordinates">${obj.coordinates}</span>
    //     </div>
    //   `;
    // }
    return html;
  }

  addPost(obj) {
    let post;
    const coords = Memory.getCoords();
    if (obj.id === 0) {
      post = {
        id: obj.id,
        text: obj.text,
        time: Memory.getTime(),
        coords,
      };
    } else if (obj.id === 1) {
      post = {
        id: obj.id,
        time: Memory.getTime(),
        coordinates: obj.coords,
      };
    }
    this.memory.push(post);
    this.render();
  }

  static getTime() {
    return moment().format('DD.MM.YYYY HH:mm');
  }

  static getCoords() {
    let coords;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        const { latitude, longitude } = data.coords;
        coords = `${latitude}, ${longitude}`;
      }, (err) => {
        try {
          coords = Memory.askForCoords();
        } catch (e) {
          console.log(err, e);
        }
      });
    } else {
      try {
        coords = Memory.askForCoords();
      } catch (e) {
        console.log(e);
      }
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
      return coords || null;
    });
    closeButton.addEventListener('click', () => {
      popupForm.reset();
      popup.classList.add('hidden');
    });
  }

  static clearDOM() {
    const posts = document.querySelectorAll('.post');
    posts.forEach((item) => item.remove());
  }

  render() {
    Memory.clearDOM();
    const wrapper = document.querySelector('.wrapper');
    this.memory.forEach((item) => {
      const post = Memory.createPost(item);
      wrapper.insertAdjacentHTML('afterbegin', post);
    });
  }
}
