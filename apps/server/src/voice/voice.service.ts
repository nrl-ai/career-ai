import { Injectable } from "@nestjs/common";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import OpenAI from "openai";
import * as fs from "fs";
import * as os from "os";
import path from "path";
import * as speech from "@google-cloud/speech";

const synthesize = (text: string, voice: string = "en-US-AvaNeural") => {
  const subscriptionKey = process.env.AZURE_SPEECH_SUBSCRIPTION_KEY || "";
  const serviceRegion = process.env.AZURE_SPEECH_REGION || "";

  // You can also use audio output stream to initialize the audio config, see the docs for details.
  const stream = sdk.AudioOutputStream.createPullStream();
  var audioConfig = sdk.AudioConfig.fromStreamOutput(stream);
  var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

  // setting the synthesis language, voice name, and output audio format.
  // see https://aka.ms/speech/tts-languages for available languages and voices
  speechConfig.speechSynthesisLanguage = "en-US";
  speechConfig.speechSynthesisVoiceName = voice;
  speechConfig.speechSynthesisOutputFormat =
    sdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

  // create the speech synthesizer.
  var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  // Before beginning speech synthesis, setup the callbacks to be invoked when an event occurs.

  // The event synthesizing signals that a synthesized audio chunk is received.
  // You will receive one or more synthesizing events as a speech phrase is synthesized.
  // You can use this callback to streaming receive the synthesized audio.
  // synthesizer.synthesizing = function (s, e) {
  //   var str = "(synthesizing) Reason: " + sdk.ResultReason[e.result.reason] + " Audio chunk length: " + e.result.audioData.byteLength;
  //   console.log(str);
  // };

  // // The event visemeReceived signals that a viseme is detected.
  // // a viseme is the visual description of a phoneme in spoken language. It defines the position of the face and mouth when speaking a word.
  // synthesizer.visemeReceived = function (s, e) {
  //   var str = "(viseme) : Viseme event received. Audio offset: " + (e.audioOffset / 10000) + "ms, viseme id: " + e.visemeId;
  //   console.log(str);
  // }

  // // The event synthesis completed signals that the synthesis is completed.
  // synthesizer.synthesisCompleted = function (s, e) {
  //   console.log("(synthesized)  Reason: " + sdk.ResultReason[e.result.reason] + " Audio length: " + e.result.audioData.byteLength);
  // };

  // // The synthesis started event signals that the synthesis is started.
  // synthesizer.synthesisStarted = function (s, e) {
  //   console.log("(synthesis started)");
  // };

  // The event signals that the service has stopped processing speech.
  // This can happen when an error is encountered.
  synthesizer.SynthesisCanceled = function (s, e) {
    var cancellationDetails = sdk.CancellationDetails.fromResult(e.result);
    var str = "(cancel) Reason: " + sdk.CancellationReason[cancellationDetails.reason];
    if (cancellationDetails.reason === sdk.CancellationReason.Error) {
      str += ": " + e.result.errorDetails;
    }
    console.log(str);
  };

  // This event signals that word boundary is received. This indicates the audio boundary of each word.
  // The unit of e.audioOffset is tick (1 tick = 100 nanoseconds), divide by 10,000 to convert to milliseconds.
  // synthesizer.wordBoundary = function (s, e) {
  //   console.log("(WordBoundary), Text: " + e.text + ", Audio offset: " + e.audioOffset / 10000 + "ms.");
  // };

  // Await the result
  return new Promise((resolve, reject) => {
    synthesizer.speakSsmlAsync(
      text,
      (result) => {
        resolve(result);
        synthesizer.close();
      },
      (err) => {
        reject(err);
        synthesizer.close();
      },
    );
  });
};

@Injectable()
export class VoiceService {
  private client: speech.SpeechClient;
  private gTTSKey: string;

  constructor() {
    // Load the Google Cloud credentials from an environment variable
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}");
    this.client = new speech.SpeechClient({
      credentials: credentials,
    });
    this.gTTSKey = process.env.GOOGLE_TTS_API_KEY || "";
  }

  async transcribeAudio(base64Audio: string): Promise<string> {
    base64Audio = base64Audio.split("base64,")[1];

    const audio = {
      content: base64Audio,
    };

    const config = {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    };

    const request = {
      audio: audio,
      config: config,
    };

    const [response] = (await this.client.recognize(request as any)) as any;
    const transcription = response.results
      .map((result: any) => result.alternatives[0].transcript)
      .join("\n");

    return transcription;
  }

  // Forward Google Cloud Speech API Text To Speech
  async textToAudioGTTS(body: any) {
    // Pass the call to https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize
    // with the API key provided in the body
    // The body should contain the text and the voice
    // The voice should be a string like "en-US-Standard-A"
    const response = await fetch(
      "https://eu-texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + this.gTTSKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    return response.json();
  }

  async textToAudio(text: string, voice: string = "en-US-AvaNeural") {
    // Map the voice name to the Azure voice name
    // https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support#text-to-speech
    if (!voice) {
      voice = "en-US-AvaNeural";
    } else if (voice === "alloy") {
      voice = "en-US-AndrewNeural";
    } else if (voice === "nova") {
      voice = "en-US-JaneNeural";
    } else if (voice === "susan") {
      voice = "en-US-AriaNeural";
    } else if (voice === "jenny") {
      voice = "en-US-JaneNeural";
    } else if (voice === "brandon") {
      voice = "en-US-BrandonNeural";
    } else {
      voice = "en-US-AvaNeural";
    }

    let say = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${voice}">${text}</voice></speak>`;
    if (voice === "en-US-JaneNeural") {
      say = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${voice}"><prosody rate="+25%">${text}</prosody></voice></speak>`;
    }

    try {
      const response = (await synthesize(say, voice)) as sdk.SpeechSynthesisResult;
      console.log(response);
      const buffer = Buffer.from(response.audioData);
      return buffer;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async speechToText(audio: string) {
    const audioFormat = audio.split(";")[0].split(":")[1].split("/")[1];
    const SUPPORTED_FORMATS = ["webm", "wav", "mp4"];
    if (!SUPPORTED_FORMATS.includes(audioFormat)) {
      throw new Error(`Unsupported audio format: ${audioFormat}`);
    }

    const base64Audio = audio.split("base64,")[1];

    // Convert the base64 audio data to a Buffer
    const audioBuff = Buffer.from(base64Audio, "base64");

    // Define the file path for storing the temporary audio file
    // generate a random file name
    const filePath = path.join(os.tmpdir(), `${Date.now()}.${audioFormat}`);

    const subscriptionKey = process.env.AZURE_SPEECH_SUBSCRIPTION_KEY || "";
    const serviceRegion = process.env.AZURE_SPEECH_REGION || "";

    // create the push stream we need for the speech sdk.
    var pushStream = sdk.AudioInputStream.createPushStream();

    try {
      // Write the audio data to a temporary audio file synchronously
      fs.writeFileSync(filePath, audio);

      // open the file and push it to the push stream.
      fs.createReadStream(filePath)
        .on("data", function (arrayBuffer: any) {
          pushStream.write(arrayBuffer.slice());
        })
        .on("end", function () {
          pushStream.close();
        });

      // now create the audio-config pointing to our stream and
      // the speech config specifying the language.
      var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
      var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

      // setting the recognition language to English.
      speechConfig.speechRecognitionLanguage = "en-US";

      // create the speech recognizer.
      var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      // Create an await able promise that will be resolved when the recognizer returns a result
      const result = new Promise((resolve, reject) => {
        recognizer.recognizeOnceAsync(
          (result) => {
            resolve(result);
            recognizer.close();
          },
          (err) => {
            reject(err);
            recognizer.close();
          },
        );
      });

      // Wait for the result
      let data;
      const resultData = (await result) as sdk.SpeechRecognitionResult;
      if (resultData) {
        data = resultData.text;
      }

      // Remove the temporary file after successful processing
      fs.unlinkSync(filePath);
      return {
        text: data,
      };
    } catch (error) {
      throw error;
    }
  }
}
