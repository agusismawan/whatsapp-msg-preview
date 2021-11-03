import styled from "styled-components";
import {
	MdCode,
	MdFormatBold,
	MdFormatItalic,
	MdFormatUnderlined,
	MdOutlineFormatStrikethrough,
} from "react-icons/md";

export const Controls = styled.div`
	width: 300px;
	height: 20px;
	background-color: #2a2f32;
	padding: 5px 20px 5px 10px;
	border-radius: 8px;
	color: white;
	z-index: 1;
	display: flex;
	align-items: center;

	column-gap: 20px;
`;

const buttonStyle = `
	cursor: pointer;
	transition: all 0.1s ease-in-out;
	:hover {
		opacity: 0.4;
	}
`;

export const BoldButton = styled(MdFormatBold)`
	${buttonStyle}
`;

export const ItalicButton = styled(MdFormatItalic)`
	${buttonStyle}
`;

export const UnderlineButton = styled(MdFormatUnderlined)`
	${buttonStyle}
`;

export const StrikethroughButton = styled(MdOutlineFormatStrikethrough)`
	${buttonStyle}
`;

export const CodeButton = styled(MdCode)`
	${buttonStyle}
`;
