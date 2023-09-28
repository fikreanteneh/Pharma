import styled from "@emotion/styled";
import tw from "twin.macro";

export const Big = styled.div`
  ${tw`text-5xl`}
`;

export const Body = styled.div`
  ${tw`min-h-screen w-screen bg-gray-900`}
  background-color:white;
  color : black;
`;

export const NavBarDiv = styled.header`
  ${tw`shadow-lg sticky z-10 flex justify-between items-center px-5 py-1 mx-auto h-[2.8rem]`}
`;

export const NavItem = styled.nav`
  ${tw`flex space-x-6`}
`;

export const HalfImageContainer = styled.div`
  ${tw`md:w-[67%] lg:w-[50%]`}
`;

export const ImageContainer = styled.div`
  ${tw`w-full h-full`}
`;
export const CenterFlex = styled.div`
  ${tw`p-3 flex justify-center flex-wrap items-center max-w-6xl mx-auto`}
`;

export const BetweenFlex = styled.div`
  ${tw`flex justify-between items-center my-auto`}
`;


type ChipProps = {
  selected: boolean;
}
export const Chip = styled.div<ChipProps>`
  ${tw`px-4 py-1 rounded-[25%] text-lg font-semibold cursor-pointer border-2 border-solid border-orange-500 border-s-8`}
  width: fit-content;
  color: orange;
  background-color: ${(props) => props.selected ? "rgb(18,20,20)": "white"};
`;

export const ChipContainer = styled.div`
  ${tw`flex space-x-2 justify-center items-center my-3`}
  `