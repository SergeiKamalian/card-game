import { useEffect } from 'react';

interface useOnClickOutsideProps {
  ref: any;
  handler: any;
  stopPropagation?: boolean;
  preventCLosedBasedElementDataName?: string;
}

function checkPreventedElement(clickedElement: HTMLElement, preventCLosedBasedElementDataName: string, index: number): boolean {
  if (index === 0) {
    return false;
  }
  const parentElement = clickedElement.parentElement as HTMLElement;
  if (!parentElement) {
    return false;
  }
  if (parentElement.getAttribute('data-name') === preventCLosedBasedElementDataName) {
    return true;
  }
  if (parentElement?.classList[0] === 'Toastify') return true;
  return checkPreventedElement(parentElement, preventCLosedBasedElementDataName, index - 1);
}

export function useOnClickOutside(props: useOnClickOutsideProps) {

  const { handler, ref, preventCLosedBasedElementDataName, stopPropagation } = props;

  useEffect(() => {
    if (stopPropagation && typeof stopPropagation !== 'undefined') return;
    const listener = (event: UIEvent) => {
      event.stopPropagation();
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      const clickedElement = event.target as HTMLElement;
      if (clickedElement.getAttribute('data-name')) return;
      const preventClosedElementIsFound = checkPreventedElement(clickedElement, preventCLosedBasedElementDataName || '', 7);
      if (preventClosedElementIsFound) return;
      handler?.(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler, preventCLosedBasedElementDataName, stopPropagation]);
}
