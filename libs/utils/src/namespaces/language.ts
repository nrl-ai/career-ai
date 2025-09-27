// Languages
export type Language = {
  id: string;
  name: string;
  locale: string;
  editorCode: string;
  progress?: number;
};

export const languages: Language[] = [
  {
    id: "en-US",
    name: "English",
    editorCode: "en",
    locale: "en-US",
  },
  {
    id: "vi",
    name: "Vietnamese",
    editorCode: "vi",
    locale: "vi-VN",
  },
];
