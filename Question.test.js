import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Question from "../components/Question";

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("creates an interval with setTimeout", () => {
  jest.spyOn(global, 'setTimeout');
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(setTimeout).toHaveBeenCalled();
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(screen.getByText(/10 seconds remaining/i)).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/9 seconds remaining/i)).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/8 seconds remaining/i)).toBeInTheDocument();
  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.getByText(/7 seconds remaining/i)).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(onAnswered).toHaveBeenCalledWith(false);
});

test("clears the timeout after unmount", () => {
  jest.spyOn(window, 'clearTimeout');
  const { unmount } = render(
    <Question question={testQuestion} onAnswered={noop} />
  );
  unmount();
  expect(clearTimeout).toHaveBeenCalled();
});