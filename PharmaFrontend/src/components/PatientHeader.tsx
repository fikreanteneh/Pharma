import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../assets';

import * as S from './../../styles';

export const PatientHeader = () => {


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
                    <S.LinkText active={lastPath == "patient"}>History</S.LinkText>
                </NavLink>

                <NavLink to="medication">
                    <S.LinkText active={lastPath == "medication"}>Medications</S.LinkText>
                </NavLink>

                <NavLink to="chat">
                    <S.LinkText active={lastPath == "chat"}>Chat</S.LinkText>
                </NavLink>

                <NavLink to="profile" >
                    <S.LinkText active={lastPath == "profile"}>Profile</S.LinkText>
                </NavLink>

            </S.NavItem>

        </S.NavBarDiv>
    )
}

export default PatientHeader;
