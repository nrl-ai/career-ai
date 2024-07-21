type Props = {
  width?: string;
  height?: string;
  aiIsSpeaking?: boolean;
};

export const AiSpeakingIcon = ({ width, height, aiIsSpeaking }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_240_1521)">
        <g filter="url(#filter1_b_240_1521)">
          <rect width="60" height="60" rx="30" fill={aiIsSpeaking ? "#007AFF" : "#8E8E93"} />
        </g>
      </g>
      <path
        d="M16 22L16 39"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23 24L23 37"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M30 16.1459V43.8542"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M37 24V37"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M44 22L44 39"
        stroke="white"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_b_240_1521"
          x="-58"
          y="-58"
          width="176"
          height="176"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="29" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_240_1521" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_240_1521"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_b_240_1521"
          x="-10.5"
          y="-10.5"
          width="81"
          height="81"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.25" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_240_1521" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_240_1521"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
