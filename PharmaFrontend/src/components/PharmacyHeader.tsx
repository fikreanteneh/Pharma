import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../assets';

import * as S from '../styles';

export const PharmacyHeader = () => {


  const location = useLocation();
  const navigate = useNavigate();
  const lastPath = location.pathname.split('/').pop();


  return (
    <S.NavBarDiv>
      {/* <S.ImageContainer> */}
      <S.HeightFitRoundedImage src={Logo} onClick={() => { navigate("/") }}></S.HeightFitRoundedImage>
      {/* </S.ImageContainer> */}
      <S.NavItem>
        <NavLink to="">
          <S.LinkText active={lastPath == "pharmacy"}>Store</S.LinkText>
        </NavLink>


        <NavLink to="profile" >
          <S.LinkText active={lastPath == "profile"}>Profile</S.LinkText>
        </NavLink>

      </S.NavItem>

    </S.NavBarDiv>
  )
}

export default PharmacyHeader;
