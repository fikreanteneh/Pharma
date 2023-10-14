import styled from "@emotion/styled";
import tw from "twin.macro";
import { ThemeProp } from "./types";

type LinkTextProp = {
  active?: boolean;
};
export const LinkText = styled.p<ThemeProp & LinkTextProp>`
  ${tw`py-3`}
  ${(prop) =>
    prop.active
      ? tw`border-b-[3px] font-semibold text-black border-red-500`
      : tw`text-gray-500 hover:text-red-500`}
`;

export const H1 = styled.h1`
  ${tw`font-bold text-6xl text-center my-[0.5em] text-black`}
`;

export const H2 = styled.h3`
  ${tw`font-bold text-4xl text-center my-[0.5em] text-black`}
`;

export const H3 = styled.h5`
  ${tw`font-bold text-2xl text-center my-[0.5em] text-black`}
`;
