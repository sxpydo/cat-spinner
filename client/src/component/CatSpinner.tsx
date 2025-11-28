import React from "react";
import styles from "../styles/CatSpinner.module.css";

type SpinnerSize = "small" | "medium" | "large" | "custom" ;

interface SpinnerProps {
  isLoading: boolean;
  size?: SpinnerSize;
  color?: string;
  captionText?: string[];
  captionInterval?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({
  isLoading,
  size = "medium",
  color,
  captionText = [
    "Polishing my tuxedo...",
    "Thinking about tuna...",
    "Loading purrfectly...",
  ],
  captionInterval = 3000,
}) => {
  const [currentCaptionIndex, setCurrentCaptionIndex] = React.useState(0);

  React.useEffect(() => {
    if (captionText.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentCaptionIndex((i) => (i + 1) % captionText.length);
    }, captionInterval);

    return () => clearInterval(intervalId);
  }, [captionText, captionInterval]);

  if (!isLoading) {
    return null;
  }

  const sizeClass = styles[`size-${size}`] || styles["size-medium"];
  const imgStyle = {
    width: size === 'small' ? '32px' : size === 'medium' ? '64px' : '128px',
    height: size === 'small' ? '32px' : size === 'medium' ? '64px' : '128px',
    ...(color && { filter: `hue-rotate(0deg) saturate(100%) brightness(100%)` }),
  };

  return (
    <div className={styles.spinnerContainer} role="status" aria-live="polite">
      <img
        src="/poppy-cat.svg"
        alt="Tuxedo Cat Spinner"
        className={`${styles.spinnerRotate} ${sizeClass}`}
        style={imgStyle}
        aria-hidden="true"
      />
      <div className={styles.spinnerCaption}>
        {captionText[currentCaptionIndex]}
      </div>
    </div>
  );
};
