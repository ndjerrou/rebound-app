import { ErrorMessageAppProps } from 'formik';
import React, { FC } from 'react';
import tw from 'twin.macro';
import { Text } from '../html';

const defaultStyles = tw`!text-red-rb-800 !text-xs uppercase`;

const ErrorMessage: FC<ErrorMessageAppProps> = ({ error, styles, visible }) =>
  visible && error ? (
    <Text styles={[defaultStyles, styles]}>{error}</Text>
  ) : null;

export default ErrorMessage;
