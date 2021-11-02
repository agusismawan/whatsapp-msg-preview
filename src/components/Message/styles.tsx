import styled from "styled-components";

export const MessageContainer = styled.div`
	width: 300px;
	height: 100px;
	background-color: #065051;
	z-index: 2;
	border-radius: 8px;
	color: white;
	padding: 5px;
	font-size: 14px;
	box-shadow: 0px 0px 50px rgb(0, 0, 0);
	position: relative;

	::after {
		content: "";
		width: 20px;
		height: 20px;
		background-color: #065051;
		position: absolute;
		right: -5px;
		top: 5px;
		transform: rotate(45deg);
	}
`;
