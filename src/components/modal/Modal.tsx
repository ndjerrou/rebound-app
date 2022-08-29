import React, { FC, useEffect, useState } from 'react';
import { css } from 'styled-components';

import { ModalStyles } from './styled';
import UsePortal from '../../hooks/usePortal';
import { ModalProps } from '../../types/components';

const Modal: FC<ModalProps> = ({ children, styles, ...otherProps }) => {
  const [heightRoot, setHeightRoot] = useState<number | undefined>(0);

  useEffect(() => {
    const element = document?.querySelector('#app-root');

    element instanceof HTMLElement && setHeightRoot(element.offsetHeight);
  }, [heightRoot]);

  const modalStyles = css`
    height: ${heightRoot}px;
  `;

  return (
    <UsePortal {...otherProps}>
      <ModalStyles $modalStyles={modalStyles} $styles={styles}>
        {children}
      </ModalStyles>
    </UsePortal>
  );
};

export default Modal;
