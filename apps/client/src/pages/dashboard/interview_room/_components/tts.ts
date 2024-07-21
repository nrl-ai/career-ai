export const textToAudio = async (text: string, voice: string = "nova") => {
  // Fetching audio
  const audioResponse = await fetch(`/api/voice/text-to-speech`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getLocalToken()}`,
    },
    body: JSON.stringify({
      text: text,
      voice: voice || "nova",
    }),
  });

  const arrayBuffer = await audioResponse.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
  const blobUrl = URL.createObjectURL(blob);

  // Play
  const audio = new Audio(blobUrl);
  return audio;
};
