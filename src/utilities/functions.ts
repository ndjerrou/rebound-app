import { RefObject } from 'react';

export const pluralize = (count: number, noun: string, suffix = 's'): string =>
  `${count} ${noun}${count > 1 ? suffix : ''}`;

export const scrollTo = (
  ref: RefObject<HTMLElement> | number | 'bottom' | 'top',
  behavior: ScrollBehavior = 'smooth',
): void => {
  const isRefObject = typeof ref === 'object';

  const isRefNumber = typeof ref === 'number';

  const isBottom = ref === 'bottom';

  let top;

  if (isRefObject) {
    const { scrollY } = window;

    const { current } = ref as RefObject<HTMLElement>;

    const { y } = current?.getBoundingClientRect() || {
      y: 0,
    };

    top = scrollY + y;
  } else if (isRefNumber) top = ref;
  else if (isBottom) {
    const element = document?.querySelector('#app-root');

    top = (element instanceof HTMLElement && element?.offsetHeight) || 0;
  } else top = 0;

  window.scrollTo({
    top,
    behavior,
  });
};
