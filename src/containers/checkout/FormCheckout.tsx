import React, { FC } from 'react';
import tw from 'twin.macro';
import * as Yup from 'yup';
import 'yup-phone';

import { useTheme } from 'styled-components';
import { Form, FormField, PayPalSubmitButton } from '../../components/forms';
import {
  Button,
  Container,
  Image,
  Label,
  Separator,
} from '../../components/html';

import iconCheckout from '../../assets/images/global/titre_rebound_bas_de_page.png';
import iconPayPal from '../../assets/images/global/paypal.png';

const required = 'est requis';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(`L'email ${required}`)
    .email(`L'email n'est pas un email valide`),
  firstName: Yup.string().required(`Le prenom ${required}`).min(1),
  lastName: Yup.string().required(`Le nom ${required}`).min(1),
  address: Yup.string().required(`L'adresse est requise`).min(1),
  postalCode: Yup.string().required(`Le code postal ${required}`).min(1),
  city: Yup.string().required(`La ville ${required}`).min(1),
  phone: Yup.string().phone('FR', false, `Le telephone invalide`).required(),
});

const FormCheckout: FC = () => {
  const { buttonColor } = useTheme();

  const containerStyles = tw`w-1/2 h-full flex flex-col items-center`;

  const hearderStyles = tw`w-full flex justify-center mt-4`;

  const buttonHeaderStyles = [tw`mt-6 ml--44 mr-12`, buttonColor];

  const formStyles = tw`w-[30rem] flex flex-col`;

  const inputStyles = tw`w-full h-8`;

  const labelStyles = tw`w-full my-3`;

  const formInitialValues = {
    email: '',
    newOffer: '',
    firstName: '',
    lastName: '',
    address: '',
    addressDetails: '',
    postalCode: '',
    city: '',
    country: 'FR',
    phone: '',
  };

  return (
    <Container styles={containerStyles}>
      <Container styles={hearderStyles}>
        <Button isBack styles={buttonHeaderStyles}>
          Retour
        </Button>
        <Image src={iconCheckout} styles={tw`w-60`} />
      </Container>
      <Image src={iconPayPal} styles={tw`w-[10rem]`} />
      <Separator styles={tw`w-[70%]`} />
      <Container styles={formStyles}>
        <Form
          initialValues={formInitialValues}
          initialError={formInitialValues}
          validationSchema={validationSchema}
          isValid={false}
        >
          <Label styles={tw`pt-8 pb-3 font-sans text-base uppercase font-bold`}>
            Contact information
          </Label>
          <FormField
            inputStyles={inputStyles}
            labelStyles={labelStyles}
            name="email"
            placeholder="Email"
            type="email"
          />
          <Label styles={tw`pt-8 pb-3 font-sans text-base uppercase font-bold`}>
            Shipping address
          </Label>
          <Container styles={tw`flex w-full`}>
            <FormField
              inputStyles={inputStyles}
              labelStyles={[labelStyles, tw`mr-4`]}
              name="firstName"
              placeholder="Prénom"
            />
            <FormField
              inputStyles={inputStyles}
              labelStyles={labelStyles}
              name="lastName"
              placeholder="Nom"
            />
          </Container>
          <FormField
            inputStyles={inputStyles}
            labelStyles={labelStyles}
            name="address"
            placeholder="Adresse"
          />
          <FormField
            inputStyles={inputStyles}
            labelStyles={labelStyles}
            name="addressDetails"
            placeholder="Appartement, suite, etc (optionel)"
          />
          <Container styles={tw`flex w-full`}>
            <FormField
              errorStyles={tw`!text-[.6rem] !leading-[.7rem] block mt-[.35rem]`}
              inputStyles={inputStyles}
              labelStyles={[labelStyles, tw`mr-4`]}
              name="postalCode"
              placeholder="Code postal"
            />
            <FormField
              errorStyles={tw`!text-[.6rem] !leading-[.7rem] block mt-[.35rem]`}
              inputStyles={inputStyles}
              labelStyles={[labelStyles, tw`mr-4`]}
              name="city"
              placeholder="Ville"
            />
            <FormField
              errorStyles={tw`!text-[.6rem] !leading-[.7rem] block mt-[.35rem]`}
              type="react-flags-select"
              name="country"
            />
          </Container>
          <FormField
            inputStyles={inputStyles}
            labelStyles={labelStyles}
            name="phone"
            placeholder="Téléphone"
          />
          <PayPalSubmitButton />
        </Form>
      </Container>
    </Container>
  );
};

export default FormCheckout;
