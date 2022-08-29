import React from 'react';
import styled from 'styled-components';

import bgLogo from '../../assets/images/global/gros_logo_en_arriere_plan.png';
import centerLogo from '../../assets/images/global/mini_logo_en_bas_de_page.png';
import LogoTitle from '../../assets/images/global/titre_rebound_bas_de_page.png';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 300px;
`;
type Props = {};

const Footer = (props: Props) => (
  <StyledFooter>
    <div
      style={{
        width: '1000px',
        height: '1200px',
        overflow: 'hidden',
        zIndex: '-1000',
      }}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          left: '-400px',
          bottom: '-200px',
          overflow: 'hidden',
          transform: 'translate(-300px, 450px)',
        }}
        src={bgLogo}
        alt=""
      />
    </div>
    <div
      style={{
        height: '250px',
        width: '250px',
        transform: 'translate(-300px, -25px)',
      }}
    >
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={centerLogo}
        alt=""
      />
    </div>
    <div
      style={{
        height: '70px',
        width: '300px',
        marginBottom: '4em',
        marginRight: '3em',
      }}
    >
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={LogoTitle}
        alt=""
      />
    </div>
  </StyledFooter>
);

export default Footer;
