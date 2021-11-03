import styled from "styled-components";

export const MessageContainer = styled.div`
	min-width: 5%;
	max-width: 49%;
	min-height: 12px;
	background-color: #065051;
	z-index: 2;
	border-radius: 8px;
	color: rgb(241 241 242 / 95%);
	padding: 5px 20px 20px 10px;
	font-size: 14px;
	box-shadow: 0px 0px 10px #00393b5f;
	position: relative;

	@media (max-width: 500px) {
		min-width: 15%;
		max-width: 55%;
	}

	::after {
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		right: -10px;
		top: 0px;
		border: 20px solid;
		border-top-right-radius: 3px;
		border-color: #065051 transparent transparent transparent;
	}
`;

export const Hour = styled.span`
	position: absolute;
	right: 25px;
	bottom: 5px;
	height: 15px;
	font-size: 11px;
	line-height: 15px;

	white-space: nowrap;
	opacity: 0.6;
`;
