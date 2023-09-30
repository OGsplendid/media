import Memory from '../memory/Memory';

export default class App {
  constructor(element) {
    this.element = element;
    this.memory = new Memory();
    this.form = this.element.querySelector('.form');
    this.input = this.element.querySelector('.input');
    // this.audioButton = this.element.querySelector('.audio-button');
    // this.videoButton = this.element.querySelector('.video-button');
    // this.mediaStart = this.element.querySelector('.media-start');
    // this.mediaStop = this.element.querySelector('.media-stop');

    this.onSubmit = this.onSubmit.bind(this);
    // this.onAudio = this.onAudio.bind(this);
    // this.onVideo = this.onVideo.bind(this);
    // this.onStop = this.onStop.bind(this);

    this.input.addEventListener('keydown', this.onSubmit);
    // this.audioButton.addEventListener('click', this.onAudio);
    // this.videoButton.addEventListener('click', this.onVideo);
    // this.mediaStop.addEventListener('click', this.onStop);
  }

  // onStop() {
  //   this.form.classList.toggle('hidden');
  //   this.media.classList.remove('audio', 'video');
  //   this.media.classList.toggle('hidden');
  // }

  onSubmit(e) {
    if (e.key === 'Enter' && e.shiftKey) {
      const text = this.form.querySelector('.input').value;
      if (text.trim().length === 0) {
        return;
      }
      this.memory.addPost(text);
      this.form.reset();
    }
  }

  // onAudio(e) {
  //   e.preventDefault();

  //   const audioStream = this.element.querySelector('.audio-stream');
  //   const audioPlayer = audioStream.querySelector('.audio-player');
  //   const mediaStart = audioStream.querySelector('.media-start');
  //   const mediaStop = audioStream.querySelector('.media-stop');
  //   const obj = {
  //     id: 1,
  //   };
  //   const audioPost = Memory.createPost(obj);

  //   this.form.classList.toggle('hidden');
  //   audioStream.classList.toggle('hidden');

  //   mediaStart.addEventListener('click', async () => {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: true,
  //     });

  //     const recorder = new MediaRecorder(stream);
  //     const chunks = [];

  //     recorder.addEventListener('start', () => {
  //       console.log('start');
  //     });

  //     recorder.addEventListener('dataavailable', (event) => {
  //       chunks.push(event.data);
  //     });

  //     recorder.addEventListener('stop', () => {
  //       const blob = new Blob(chunks);
  //       audioPlayer.srcObj = URL.createObjectURL(blob);
  //     });

  //     recorder.start();

  //     mediaStart.addEventListener('click', () => {
  //       recorder.stop();
  //       stream.getTracks().forEach((track) => track.stop());
  //     });
  //   });
  // }

  // onVideo(e) {
  //   e.preventDefault();

  //   this.form.classList.toggle('hidden');
  //   this.media.classList.add('video');
  //   this.media.classList.toggle('hidden');
  // }
}
