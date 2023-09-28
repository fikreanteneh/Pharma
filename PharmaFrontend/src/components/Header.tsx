import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../assets';

import * as S from './../../styles';
import useAuth from '../state/store/useAuth';

export const Header = () => {

    const { status, userRole, currentUser } = useAuth(state => state.authState)
    const location = useLocation();
    const navigate = useNavigate();



    return (
        <S.NavBarDiv>
            {/* <S.ImageContainer> */}
            <S.HeightFitRoundedImage src={Logo} onClick={() => { navigate("/") }}></S.HeightFitRoundedImage>
            {/* </S.ImageContainer> */}
            <S.NavItem>

                <NavLink to={`/medicines`} >
                    <S.LinkText active={location.pathname == "/medicines"}>Medicines</S.LinkText>
                </NavLink>

                <NavLink to={`/pharmacies`} >
                    <S.LinkText active={location.pathname == "/pharmacies"}>Pharmacies</S.LinkText>
                </NavLink>

                <NavLink to={`/about`} >
                    <S.LinkText active={location.pathname == "/about"}>About Us</S.LinkText>
                </NavLink>

                <NavLink to={`/contact`} >
                    <S.LinkText active={location.pathname == "/contact"}>Contact</S.LinkText>
                </NavLink>

                {status == "authenticated" &&
                    <NavLink to={`/${userRole}`} >
                        <S.LinkText >Manage Store</S.LinkText>
                    </NavLink>}


                {!currentUser &&
                    <NavLink to="/signin">
                        <S.LinkText active={location.pathname == "/signin"}>signin</S.LinkText>
                    </NavLink>}
            </S.NavItem>

        </S.NavBarDiv>
    )
}

export default Header;
