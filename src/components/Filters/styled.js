import styled from "styled-components";
import { H4, Blank, IconButton, Switch as SwitchUI, Slider as SliderUi } from "@evergis/ui";

import { Swiper as SwiperUI } from "../../components/Swiper/Swiper";

export const FiltersContainer = styled(Blank)`
  z-index: 5;
  position: absolute;
  top: 15px;
  left: 15px;
  transition: transform 144ms ease;
  transform-origin: calc(64px / 2) calc(64px / 2);
  transform: ${({ isVisible }) => (isVisible ? "scale(1)" : "scale(0)")};
  border-radius: 4px;
  @media (max-width: 860px) and (orientation: portrait) {
    top: 10px;
    left: 10px;
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    transform-origin: 50% calc(100% - 40px);
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 4px 4px 0 0;
  }
`;

export const Block = styled("div")`
  margin-right: 65px;
  width: 290px;
  @media (max-width: 860px) and (orientation: portrait) {
    margin-right: 45px;
    width: 260px;
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 50px;
  }
`;

export const SecondBlock = styled(Block)`
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    margin-bottom: 24px;
  }
`;

export const Header = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled(H4)`
  display: flex;
  margin: 0;
  max-width: 214px;
  justify-content: space-around;
`;

export const Switch = styled(SwitchUI)``;

export const Slider = styled(SliderUi)`
  margin-top: 15px;
  padding: 0 25px;
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
    width: calc(100% - 20px);
  }
  > div:last-of-type {
    > div {
      margin-top: 14px;
      width: 34px;
      font-size: 0;
      display: flex;
      flex-wrap: wrap;
      white-space: normal;
      color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.36)" : "rgba(0, 0, 0, 0.54)")};
      &:before {
        display: inline-block;
        font-size: 12px;
      }
      &:before:first-letter {
        display: inline-block;
        color: green !important;
      }
    }
    > div:nth-of-type(2) {
      &:before {
        content: "5 марта";
      }
    }
    > div:nth-of-type(3) {
      &:before {
        content: "6 марта";
      }
    }
    > div:nth-of-type(4) {
      &:before {
        content: "7 марта";
      }
    }
    > div:first-of-type,
    > div:last-of-type {
      font-size: 0;
    }
    > div:first-of-type {
      transform: translate(0, 0);
      left: -28px;
      &:before {
        content: "Обычный день";
      }
    }
    > div:last-of-type {
      &:before {
        content: "8 марта";
        color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.36)" : "#f6609e")};
      }
    }
  }
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
  @media (max-width: 860px) and (orientation: portrait) {
    top: 16px;
    right: 14px;
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    top: 5px;
    right: 10px;
  }
`;

export const Swiper = styled(SwiperUI)`
  display: flex;
  padding: 25px 20px 25px 30px;
  @media (max-width: 860px) and (orientation: portrait) {
    padding: 20px 15px 20px 25px;
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    flex-direction: column;
    padding: 44px 20px 0 20px;
  }
`;
