import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "./useVisualMode.js";

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

const SECOND = "SECOND";

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.mode.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});