import styled from "styled-components";
import bg from "../../assets/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #090e11;
	position: relative;
	background-image: url(${bg});
`;

export const BgMask = styled.div`
	opacity: 0.9;
	background-color: #000;
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
`;
