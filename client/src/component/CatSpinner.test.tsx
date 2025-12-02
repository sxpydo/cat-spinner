// ✅ Mocks FIRST - before ANY imports that use them
vi.mock("../styles/CatSpinner.module.css", () => ({
  __esModule: true,
  default: new Proxy({}, {
    get: (_, prop) => String(prop),
  }),
}));
vi.mock("/poppy-cat.svg", () => ({ default: "poppy-cat.svg" }));
vi.useFakeTimers();

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import { Spinner as CatSpinner } from "./CatSpinner";

describe("CatSpinner", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllTimers();
  });

  describe("Visibility and Basic Rendering", () => {
    it("renders null when isLoading is false", () => {
      const { container } = render(<CatSpinner isLoading={false} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders the spinner container when isLoading is true", () => {
      render(<CatSpinner isLoading={true} />);
      const spinnerContainer = screen.getByRole("status");
      expect(spinnerContainer).toBeInTheDocument();
      expect(spinnerContainer).toHaveClass("spinnerContainer");
    });

    it("renders the cat image with default alt text", () => {
      render(<CatSpinner isLoading={true} />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      expect(catImage).toBeInTheDocument();
      expect(catImage).toHaveAttribute("src", "/poppy-cat.svg");
      expect(catImage).toHaveClass("spinnerRotate");
      expect(catImage).toHaveClass("size-medium");
    });
  });

  describe("Caption Rotation", () => {
    const customCaptions = ["First", "Second", "Third"];
    const interval = 1000;

    it("displays the first caption initially", () => {
      render(
        <CatSpinner
          isLoading={true}
          captions={customCaptions}
          captionInterval={interval}
        />
      );
      expect(screen.getByText("First")).toBeInTheDocument();
    });

    it("rotates captions after the specified interval", () => {
      render(
        <CatSpinner
          isLoading={true}
          captions={customCaptions}
          captionInterval={interval}
        />
      );

      act(() => {
        vi.advanceTimersByTime(interval);
      });
      expect(screen.getByText("Second")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(interval);
      });
      expect(screen.getByText("Third")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(interval);
      });
      expect(screen.getByText("First")).toBeInTheDocument();
    });

    it("does not rotate if there is only one caption", () => {
      const singleCaption = ["Single Cap"];
      render(
        <CatSpinner
          isLoading={true}
          captions={singleCaption}
          captionInterval={interval}
        />
      );
      expect(screen.getByText("Single Cap")).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(interval * 5);
      });
      expect(screen.getByText("Single Cap")).toBeInTheDocument();
    });
  });

  describe("Size Prop", () => {
    it("applies default (medium) size styles and class", () => {
      render(<CatSpinner isLoading={true} />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      expect(catImage).toHaveStyle({ width: "64px", height: "64px" });
      expect(catImage).toHaveClass("size-medium");
    });

    it("applies small size styles and class", () => {
      render(<CatSpinner isLoading={true} size="small" />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      expect(catImage).toHaveStyle({ width: "32px", height: "32px" });
      expect(catImage).toHaveClass("size-small");
    });

    it("applies large size styles and class", () => {
      render(<CatSpinner isLoading={true} size="large" />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      expect(catImage).toHaveStyle({ width: "128px", height: "128px" });
      expect(catImage).toHaveClass("size-large");
    });

    it("applies custom class but no explicit size style for 'custom'", () => {
      render(<CatSpinner isLoading={true} size="custom" />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      
      expect(catImage.style.width).toBe("");
      expect(catImage.style.height).toBe("");
      expect(catImage).toHaveClass("size-custom");
    });
  });

  describe("Color Prop", () => {
    it("applies the colour filter when 'color' prop is provided", () => {
      const customColor = "#ff0000";
      render(<CatSpinner isLoading={true} color={customColor} />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      expect(catImage).toHaveStyle("filter: brightness(0) saturate(100%)");
    });
  });

  describe("Accessibility Props", () => {
    it("uses the default aria-label", () => {
      render(<CatSpinner isLoading={true} />);
      expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading");
    });

    it("uses a custom aria-label", () => {
      const customLabel = "Custom Pet Loading";
      render(<CatSpinner isLoading={true} aria-label={customLabel} />);
      expect(screen.getByRole("status")).toHaveAttribute("aria-label", customLabel);
    });

    it("sets aria-hidden='true' on the image and aria-live='polite' on the container", () => {
      render(<CatSpinner isLoading={true} />);
      const catImage = screen.getByAltText("Tuxedo Cat Spinner");
      const container = screen.getByRole("status");

      expect(catImage).toHaveAttribute("aria-hidden", "true");
      expect(container).toHaveAttribute("aria-live", "polite");
    });
  });
});
