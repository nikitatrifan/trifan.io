import { RefObject } from "react";
import { Camera, Group } from "three";
import { atom } from "recoil";

export type ThemeModelInterface = {
  interfaceRef: RefObject<{
    camera: Camera | undefined;
    model: Group | undefined;
    rendering: boolean;
    showcasing: boolean;
    transitionToShowcasingStage: () => void;
    transitionToDefaultStage: () => void;
  }>;
  rendererRef: RefObject<HTMLDivElement>;
};

export const ThemeModelAtom = atom<ThemeModelInterface>({
  key: "theme-model",
  default: {
    rendererRef: { current: null } as ThemeModelInterface["rendererRef"],
    interfaceRef: {
      current: {
        camera: undefined,
        model: undefined,
        rendering: true,
        showcasing: false,
        transitionToShowcasingStage: () => {},
        transitionToDefaultStage: () => {},
      },
    } as ThemeModelInterface["interfaceRef"],
  },
  dangerouslyAllowMutability: true,
});
