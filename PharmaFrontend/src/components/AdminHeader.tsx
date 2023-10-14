import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../assets';

import * as S from '../styles';

export const AdminHeader = () => {


    const location = useLocation();
    const navigate = useNavigate();


    return (
        <S.NavBarDiv>
            {/* <S.ImageContainer> */}
            <S.HeightFitRoundedImage src={Logo} onClick={() => { navigate("/") }}></S.HeightFitRoundedImage>
            {/* </S.ImageContainer> */}
            <S.NavItem>
                <NavLink to="">
                    <S.LinkText active={location.pathname == "admin"}>Medicines</S.LinkText>
                </NavLink>

                <NavLink to="pharmacy">
                    <S.LinkText active={location.pathname == "pharmacy"}>Pharmacies</S.LinkText>
                </NavLink>

                <NavLink to="managment">
                    <S.LinkText active={location.pathname == "managment"}>Admins</S.LinkText>
                </NavLink>

                <NavLink to="profile" >
                    <S.LinkText active={location.pathname == "profile"}>Profile</S.LinkText>
                </NavLink>

            </S.NavItem>

        </S.NavBarDiv>
    )

}

export default AdminHeader;
