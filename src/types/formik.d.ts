import { FormikErrors, FormikFormProps, FormikTouched } from 'formik';
import { HTMLInputTypeAttribute } from 'react';
import { AppStyled } from 'styled-components';
import { InputProps } from './html';

declare module 'formik' {
  export interface SubmitButtonProps extends FormikFormProps, AppStylesProps {
    type?: HTMLInputTypeAttribute;
  }

  export interface FormFieldProps extends InputProps {
    errorStyles?: AppStyled;
    inputStyles?: AppStyled;
    labelStyles?: AppStyled;
  }

  export interface ErrorMessageAppProps extends AppStylesProps {
    error: FormikErrors;
    visible: FormikTouched;
  }
}
