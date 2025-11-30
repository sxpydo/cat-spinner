import React from "react";
import styles from "../styles/CatSpinner.module.css";

type SpinnerSize = "small" | "medium" | "large" | "custom";

interface SpinnerProps {
  isLoading: boolean;
  size?: SpinnerSize;
  color?: string;
  captions?: string[];
  captionInterval?: number;
  "aria-label"?: string;
}

const DEFAULT_CAPTIONS = [
  "Polishing my tuxedo...",
  "Thinking about tuna...",
  "Loading purrfectly...",
];

function useRotatingCaption(captions: string[], interval: number): string {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (captions.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % captions.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [captions, interval]);

  return captions[index] ?? "";
}

function getSizeStyle(size: SpinnerSize) {
  switch (size) {
    case "small":
      return { width: 32, height: 32 };
    case "large":
      return { width: 128, height: 128 };
    case "medium":
    default:
      return { width: 64, height: 64 };
  }
}

export const Spinner: React.FC<SpinnerProps> = ({
  isLoading,
  size = "medium",
  color,
  captions = DEFAULT_CAPTIONS,
  captionInterval = 3000,
  "aria-label": ariaLabel = "Loading",
}) => {
  const currentCaption = useRotatingCaption(captions, captionInterval);

  if (!isLoading) return null;

  const sizeStyle = size === "custom" ? undefined : getSizeStyle(size);

  const imgStyle: React.CSSProperties = {
    ...sizeStyle,
    ...(color && { filter: `brightness(0) saturate(100%)` }),
  };

  const sizeClass = styles[`size-${size}`] ?? styles["size-medium"];

  return (
    <div
      className={styles.spinnerContainer}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <img
        src="/poppy-cat.svg"
        alt="Tuxedo Cat Spinner"
        className={`${styles.spinnerRotate} ${sizeClass}`}
        style={imgStyle}
        aria-hidden="true"
      />
      <div className={styles.spinnerCaption}>{currentCaption}</div>
    </div>
  );
};
