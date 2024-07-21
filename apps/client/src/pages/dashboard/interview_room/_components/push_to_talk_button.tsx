type Props = {
    width?: string,
    height?: string, 
    aiIsSpeaking?: boolean,
}

export const PushToTalkButton = ({width, height, aiIsSpeaking} : Props) => {
    return (
        <button>
            <svg width={width} height={height} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_240_1273)">
                    <rect width="60" height="60" rx="30" fill={aiIsSpeaking ? "#007AFF" : "#8E8E93"}/>
                </g>
                <path d="M30 34.0834C32.5784 34.0834 34.6667 31.995 34.6667 29.4167V23C34.6667 20.4217 32.5784 18.3334 30 18.3334C27.4217 18.3334 25.3334 20.4217 25.3334 23V29.4167C25.3334 31.995 27.4217 34.0834 30 34.0834Z" stroke="white" stroke-width="2.24999" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21.0756 27.2583V29.2416C21.0756 34.165 25.0772 38.1666 30.0006 38.1666C34.9239 38.1666 38.9256 34.165 38.9256 29.2416V27.2583" stroke="white" stroke-width="2.24999" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M30.0001 38.1667V41.6667" stroke="white" stroke-width="2.24999" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                    <filter id="filter0_b_240_1273" x="-10.5" y="-10.5" width="81" height="81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.25"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_240_1273"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_240_1273" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </button>
    )
}