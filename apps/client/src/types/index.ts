export {};

declare global {
  interface Window {
    playingAudio: HTMLAudioElement | null;
    audioRecorded: any;
    audioRecorder: any;
    ffmpegInstance: any;
    ffmpegStatus: string;
  }
}
