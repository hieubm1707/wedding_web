// Place audio file at public/music/background.mp3
const MUSIC_SRC = "/music/background.mp3";
const VOLUME = 0.35;

let _audio: HTMLAudioElement | null = null;

function get(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio(MUSIC_SRC);
    _audio.loop = true;
    _audio.volume = VOLUME;
  }
  return _audio;
}

export function play(): Promise<void> {
  return get().play();
}

export function pause(): void {
  get().pause();
}

export function getAudio(): HTMLAudioElement {
  return get();
}
