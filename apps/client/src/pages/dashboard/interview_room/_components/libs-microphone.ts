import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import { isEdge, isSafari } from "react-device-detect";
import coreURL from "@ffmpeg/core?url";
import wasmURL from "@ffmpeg/core/wasm?url";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

const SUPPORTED_AUDIO_TYPES = ["ogg", "webm", "wav", "mp4", "mp3"];

const askAudioPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (e) {
    return false;
  }
};

const loadFfmpeg = async () => {
  if (window.ffmpegStatus === "loaded" || window.ffmpegStatus === "loading") return;
  console.log("Loading ffmpeg");
  window.ffmpegStatus = "loading";
  window.ffmpegInstance.on("log", ({ message }: { message: any }) => {
    console.log(message);
  });
  // toBlobURL is used to bypass CORS issue, urls with the same
  // domain can be used directly.
  await window.ffmpegInstance.load({ coreURL, wasmURL });
  window.ffmpegStatus = "loaded";
};

const initializeWindowFFmpeg = async () => {
  if (window.ffmpegInstance) {
    console.log("FFmpeg already initialized. Waiting for load");
    // Wait ffmpeg to load (window.ffmpegStatus === 'loaded')
    while (window.ffmpegStatus !== "loaded") {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log("FFmpeg loaded. Returning instance");
    return window.ffmpegInstance;
  }
  console.log("Initializing FFmpeg instance");
  window.ffmpegInstance = new FFmpeg();
  await loadFfmpeg();
  return window.ffmpegInstance;
};

const convertToOgg = async (blob: Blob, sampleRate = 44100) => {
  let fileType = blob.type.split("/")[1];
  fileType = fileType.split(";")[0];
  fileType = fileType.substring(0, 4);
  fileType = fileType.replace(/[^a-z0-9]/gi, "").toLowerCase();
  if (fileType === "mpeg") fileType = "mp3";
  if (SUPPORTED_AUDIO_TYPES.indexOf(fileType) === -1) {
    throw new Error(`Unsupported audio type: ${fileType}`);
  }
  const ffmpeg = await initializeWindowFFmpeg();
  await ffmpeg.writeFile(`input.${fileType}`, new Uint8Array(await blob.arrayBuffer()));

  // Update sample rate to vorbis, 44100 Hz, mono, fltp (default)
  // This will allow using with Safari
  await ffmpeg.exec([
    "-i",
    `input.${fileType}`,
    "-c:a",
    "libvorbis",
    "-ar",
    String(sampleRate),
    "-ac",
    "1",
    "-f",
    "ogg",
    "output.ogg",
  ]);
  const convertedData = await ffmpeg.readFile("output.ogg");
  const oggBlob = new Blob([convertedData], { type: "audio/ogg" });
  return oggBlob;
};

// Convert to mono channel wav
const convertToWav = async (blob: Blob, sampleRate = 16000) => {
  let fileType = blob.type.split("/")[1];
  fileType = fileType.split(";")[0];
  fileType = fileType.substring(0, 4);
  fileType = fileType.replace(/[^a-z0-9]/gi, "").toLowerCase();
  if (fileType === "mpeg") fileType = "mp3";
  if (SUPPORTED_AUDIO_TYPES.indexOf(fileType) === -1) {
    throw new Error(`Unsupported audio type: ${fileType}`);
  }
  const ffmpeg = await initializeWindowFFmpeg();
  await ffmpeg.writeFile(`input.${fileType}`, new Uint8Array(await blob.arrayBuffer()));
  await ffmpeg.exec([
    "-i",
    `input.${fileType}`,
    "-ac",
    "1",
    "-ar",
    String(sampleRate),
    "output.wav",
  ]);
  const convertedData = await ffmpeg.readFile("output.wav");
  const wavBlob = new Blob([convertedData], { type: "audio/wav" });
  return wavBlob;
};

const startRecording = async () => {
  let options = {
    type: "audio",
    numberOfAudioChannels: isEdge ? 1 : 2,
    checkForInactiveTracks: true,
    bufferSize: 16384,
  } as RecordRTC.Options;

  if (isSafari || isEdge) {
    options.recorderType = StereoAudioRecorder;
  }

  if (isSafari) {
    options.sampleRate = 44100;
    options.bufferSize = 4096;
    options.numberOfAudioChannels = 2;
  }

  const userMicStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: isEdge ? true : false,
    },
  });

  if (window.audioRecorder) {
    window.audioRecorder.destroy();
    window.audioRecorder = null;
  }

  window.audioRecorder = new RecordRTC(userMicStream, options);
  window.audioRecorder.startRecording();
};

const stopRecording = async (callback: (blob: Blob) => void) => {
  if (!window.audioRecorder) return;
  window.audioRecorder.stopRecording(async () => {
    const blob = window.audioRecorder.getBlob();
    callback(blob);
  });
};

export {
  startRecording,
  stopRecording,
  askAudioPermission,
  initializeWindowFFmpeg,
  convertToOgg,
  convertToWav,
};
