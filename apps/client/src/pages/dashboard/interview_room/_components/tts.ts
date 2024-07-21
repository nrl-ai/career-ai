export const textToAudio = async (text: string, voice: string = "nova") => {
  // Prepare the input for Google Text-to-Speech compatible format
  const input = {
    input: { text },
    voice: { languageCode: "en-US", name: "en-US-Standard-A" },
    audioConfig: {
      audioEncoding: "OGG_OPUS",
      speakingRate: 1,
      pitch: 0,
      volumeGainDb: 0,
    },
  };

  // Fetching audio
  const audioResponse = await fetch(`/api/voice/text-to-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getLocalToken()}`,
    },
    body: JSON.stringify(input),
  });

  // Convert to audio
  const audioResponseJson = await audioResponse.json();
  const audioBuffer = audioResponseJson.audioContent; // ArrayBuffer
  const audioBlob = new Blob([audioBuffer], { type: "audio/ogg" });
  const blobUrl = URL.createObjectURL(audioBlob);
  console.log(blobUrl);

  // Play
  const audio = new Audio(blobUrl);
  return audio;
};
