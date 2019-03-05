import styled from "styled-components";
import { H3, Blank, IconButton, Switch as SwitchUI, Slider as SliderUi } from "@evergis/ui";

import { Swiper as SwiperUI } from "../../components/Swiper/Swiper";

export const FiltersContainer = styled(Blank)`
  display: flex;
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
    flex-direction: column;
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
    margin-bottom: 30px;
  }
`;

export const Header = styled("div")`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled(H3)`
  display: flex;
  margin: 0;
  justify-content: space-around;
`;

export const Switch = styled(SwitchUI)``;

export const Slider = styled(SliderUi)`
  margin-top: 15px;
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
    width: calc(100% - 20px);
  }
  > div:last-of-type {
    > div {
      color: ${({ disabled }) => (disabled ? "rgba(0, 0, 0, 0.36)" : "rgba(0, 0, 0, 0.54)")};
    }
    > div:first-of-type,
    > div:last-of-type {
      font-size: 0;
      &:before {
        font-size: 12px;
      }
    }
    > div:first-of-type {
      transform: translate(0, 0);
      left: -4px;
      &:before {
        content: "Обычно";
      }
    }
    > div:last-of-type {
      &:before {
        font-size: 12px;
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
  padding: 25px 20px 25px 30px;
  @media (max-width: 860px) and (orientation: portrait) {
    padding: 20px 15px 20px 25px;
  }
  @media (max-width: 767px) and (orientation: portrait),
    (max-width: 812px) and (orientation: landscape) {
    padding: 44px 20px 0 20px;
  }
`;
