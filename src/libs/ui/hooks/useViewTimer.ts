import { useAppContext } from "../../contexts";

interface UseViewTimerProps {
  seconds: number;
  finishText: string;
}

export const useViewTimer = (props: UseViewTimerProps) => {
  const { finishText, seconds } = props;

  const { setTimerTexts } = useAppContext();

  return () => {
    setTimerTexts([
      ...new Array(seconds).fill(null).map((_, index) => seconds - index),
      finishText,
    ]);
  };
};
