import React, { FC, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import { ButtonProps, ButtonStyledProps } from '../../types/html';

const ButtonStyles = styled.button<ButtonStyledProps>(
  ({ $isBack, $styles, theme: { buttonColor } }) => [
    tw`font-rb-swis flex justify-center items-center cursor-pointer border-none uppercase text-white`,
    buttonColor,
    $isBack &&
      tw`rounded-full px-8 py-6 h-10 bg-blue-rb-700 hover:bg-blue-rb-750 active:bg-blue-rb-750 text-[.7rem]`,
    $styles,
  ],
);

const Button: FC<ButtonProps> = ({
  isBack,
  styles,
  children,
  onClick,
  ...otherProps
}) => {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent): void =>
    isBack ? navigate(-1) : onClick && onClick(e);

  return (
    <ButtonStyles
      $isBack={isBack}
      $styles={styles}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
