import { SubmitButtonProps, useFormikContext } from 'formik';
import React, { FC } from 'react';

import { Button } from '../html';

const SubmitButton: FC<SubmitButtonProps> = ({ title, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button type="submit" onClick={handleSubmit} {...otherProps}>
      {title}
    </Button>
  );
};

export default SubmitButton;
