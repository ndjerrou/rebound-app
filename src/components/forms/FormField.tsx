import {
  Field,
  FormFieldProps,
  FormikContextType,
  FormikValues,
  useFormikContext,
} from 'formik';
import React, { FC, MouseEvent, ReactElement, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import styled, { AppStyled, css, useTheme } from 'styled-components';
import tw from 'twin.macro';

import { Input, Label, Text } from '../html';
import { ErrorMessage } from '.';

const ReactFlagsSelectStyled = styled(ReactFlagsSelect)`
  ${tw`top-3 pb-0`}

  & button {
    ${tw`h-[38px] border border-gray-rb-700`}
  }
`;

const AppFormField: FC<FormFieldProps> = ({
  children,
  errorStyles,
  inputStyles,
  labelStyles,
  max,
  min,
  name = '',
  type = 'text',
  onClick,
  ...otherProps
}): ReactElement => {
  const {
    handleChange,
    setFieldTouched,
    setValues,
    values,
    errors,
    touched,
  }: FormikContextType<FormikValues> = useFormikContext();

  const { textColor } = useTheme();

  const [select, setSelect] = useState(values[name]);

  const errorLabelStyles = errors[name] && touched[name] && tw`mt--4`;

  const errorInputStyles =
    errors[name] && touched[name] && tw`border-red-rb-800`;

  const isRadio = type === 'radio';

  const IsReactFlagsSelect = type === 'react-flags-select';

  const isRange = type === 'range' && min && max;

  const RangeCallback = (): AppStyled => {
    const positionBubleRange = Number(
      ((values[name] - Number(min)) * 95) / (Number(max) - Number(min)),
    );

    const rangeStyles = [
      tw`absolute !text-xs !font-rb-swis top[22px]`,
      css`
        left: ${positionBubleRange}%;
      `,
      textColor,
    ];

    return rangeStyles;
  };

  const valueRangeStyles = isRange ? RangeCallback() : [];

  const changeRadio = (e: MouseEvent): void => {
    const target = e.target as HTMLInputElement;

    if (target.value === values[name]) {
      target.checked = false;
      values[name] = false;
      setValues(values);
    }
  };

  const onSelect = (code: string): void => {
    values[name] = code;

    setValues(values);

    setSelect(code);
  };

  if (IsReactFlagsSelect)
    return (
      <Field
        component={ReactFlagsSelectStyled}
        countries={['FR', 'FI', 'GB', 'IE', 'IT', 'NL', 'SE']}
        name={name}
        onSelect={onSelect}
        searchable
        selected={select}
      />
    );

  return (
    <Label onClick={onClick} styles={[labelStyles, errorLabelStyles]}>
      <ErrorMessage
        error={errors[name]}
        styles={errorStyles}
        visible={touched[name]}
      />
      {children}
      <Input
        max={max}
        min={min}
        name={name}
        onBlur={(): void => setFieldTouched(name)}
        onChange={handleChange(name)}
        onClick={(isRadio && changeRadio) || undefined}
        styles={[inputStyles, errorInputStyles]}
        type={type}
        value={values[name]}
        {...otherProps}
      />
      {isRange && <Text styles={valueRangeStyles}>{values[name]}€</Text>}
    </Label>
  );
};

export default AppFormField;
