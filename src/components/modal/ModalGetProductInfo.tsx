import { FormikContextType, FormikValues } from 'formik';
import React, { FC, MouseEventHandler, useRef, useState } from 'react';
import { GrSend } from 'react-icons/gr';
import { RingLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import styled, { AppStyled, css, useTheme } from 'styled-components';
import tw from 'twin.macro';
import * as Yup from 'yup';

import { Modal } from '.';
import { ErrorMessage, Form, FormField } from '../forms';
import { Button, Container, Text } from '../html';
import Spinner from '../Spinner';
import useApi from '../../hooks/useApi';
import { ModalGetProductInfoProps } from '../../types/components';
import { createNotification } from '../../api/notifications';

const ButtonPay = styled(Button)`
  ${tw`rounded-full bg-white hover:bg-white/95 active:bg-white/95 text-lg text-blue-rb-800 font-rb-akira-sup w-48 h-[3.5rem] self-center mt-12 mr-5`}
`;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('besoin email').required(`champ requis`),
});

const ModalGetProductInfo: FC<ModalGetProductInfoProps> = ({
  title = '',
  stateModal: [stateShowInformation, setShowInformation] = [],
}) => {
  const notificationApi = useApi(createNotification);

  const { backgroundColor, textColor } = useTheme();

  const formikRef = useRef();

  const modalStyles: AppStyled[] = stateShowInformation
    ? [tw`opacity-100`]
    : [tw`opacity-0`];

  modalStyles.push(css`
    transition: opacity 500ms, z-index 500ms;
  `);

  const cartStyles: AppStyled[] = [
    tw`w-[46%] h-[33rem] pt-8 px-10 bg-blue-rb-800 rounded-[72px] flex flex-col fixed bottom-14 right-[-29rem]`,
    css`
      transition: transform 200ms;
    `,
  ];

  if (stateShowInformation) {
    modalStyles.push(tw`bg-white/40 z-20`);
    cartStyles.push(
      css`
        transform: translateX(-27rem);
      `,
    );
  }

  const formInitialValues = {
    title,
    email: '',
  };

  const [error, setError] = useState('');

  const [loginFailed, setLoginFailed] = useState(false);

  const handleClick: MouseEventHandler = () => {
    const { current } = formikRef;

    const { handleSubmit } =
      current as unknown as FormikContextType<FormikValues>;

    handleSubmit();
  };

  const handleSubmit = async (
    form: FormikValues,
    { resetForm }: FormikValues,
  ): Promise<void> => {
    setLoginFailed(false);

    const result = await notificationApi.request(form);

    if (!result?.ok) {
      setError(result?.data?.message);
      return setLoginFailed(true);
    }

    toast(
      'Votre demande à bien été prise en compte, vous recevrez prochainenement un email concernant les informations détaillées de votre T-shirt !',
    );

    return resetForm();
  };

  return (
    <Modal id="information-root" styles={modalStyles}>
      <Container styles={cartStyles}>
        <Button
          onClick={(): void => setShowInformation && setShowInformation(false)}
          styles={tw`justify-start`}
        >
          X
        </Button>
        <h1>
          Tu veux plus d'informations sur la revente et sa côte dans le marché
        </h1>
        <Text>1 Rentre ton mail</Text>
        <Form
          innerRef={formikRef}
          initialValues={formInitialValues}
          initialError={formInitialValues}
          isValid={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            styles={tw`self-center`}
            error={error}
            visible={loginFailed}
          />
          <Container styles={tw`flex self-center`}>
            <FormField
              inputStyles={tw`h-full rounded-lg ml-2`}
              labelStyles={[
                tw`border rounded-xl mr-2 pl-2 pb-1 font-rb-akira-sup text-white text-xs`,
                backgroundColor,
              ]}
              name="email"
              type="email"
            />
          </Container>
        </Form>
        <Text>2 Reçois la fiche d'infirmation</Text>
        <Text>3 Etudie l'investissement & achète ton tee</Text>
        <ButtonPay onClick={handleClick}>
          <Text>Envoyer</Text>
          {notificationApi.loading ? (
            <Spinner
              loading={notificationApi.loading}
              size={24}
              Spinner={RingLoader}
            />
          ) : (
            <GrSend />
          )}
        </ButtonPay>
      </Container>
    </Modal>
  );
};

export default ModalGetProductInfo;
