import { Formik, FormikValues } from 'formik';
import React, { FC, ReactNode } from 'react';

const AppForm: FC<FormikValues> = ({
  initialValues,
  onSubmit,
  children,
  ...otherProps
}) => (
  <Formik initialValues={initialValues} onSubmit={onSubmit} {...otherProps}>
    {(): ReactNode => children}
  </Formik>
);

export default AppForm;
