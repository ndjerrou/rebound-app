import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { UsePortalProps } from '../types/hooks';

/**
 * @param children Child elements
 * @param id CSS id
 * @param el HTML element to create.  default: div
 */
const UsePortal: FC<UsePortalProps> = ({
  children,
  id = 'modal-root',
  el = 'div',
}) => {
  const app = document.querySelector('#app-root');

  const [container] = useState(document.createElement(el));

  container.id = id;

  useEffect(() => {
    document.body.insertBefore(container, app);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

export default UsePortal;
