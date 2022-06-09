import React, { useEffect, useState } from "react";
import "./App.css";
import "./normalize.css";
import Message from "./components/Message";
import Background from "./components/Background";
import ClipboardJS from "clipboard";
import {
	Editor,
	EditorState,
	RichUtils,
	DraftEditorCommand,
	convertToRaw,
	convertFromRaw,
	RawDraftInlineStyleRange,
} from "draft-js";
import "draft-js/dist/Draft.css";
import {
	BoldButton,
	ClipboardButton,
	CodeButton,
	Controls,
	ItalicButton,
	ShareButton,
	StrikethroughButton,
} from "./components/styles";

function App() {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [whatsappFormat, setWhatsappFormat] = useState("");

	const onChange = (editorState: EditorState) => {
		setEditorState(editorState);
	};

	const handleKeyCommand = (
		command: DraftEditorCommand,
		editorState: EditorState
	) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);

		if (newState) {
			onChange(newState);
			return "handled";
		}

		return "not-handled";
	};

	const onBoldClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
	};
	const onItalicClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
	};
	const onStrikethroughClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
	};
	const onCodeClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "CODE"));
	};

	new ClipboardJS("#clipboard");

	type FormatChar = "*" | "_" | "~" | "```";
	type StyleType = "BOLD" | "ITALIC" | "STRIKETHROUGH" | "CODE";

	useEffect(() => {
		function getFormatChar(range: RawDraftInlineStyleRange): FormatChar {
			switch (range.style as StyleType) {
				case "BOLD":
					return "*";
				case "ITALIC":
					return "_";
				case "STRIKETHROUGH":
					return "~";
				case "CODE":
					return "```";
			}
		}

		function countChars(text: string): number {
			const textArray = Array.from(text);
			let count = 0;
			textArray.map((char) => {
				if (char === "*" || char === "_" || char === "~" || char === "`") {
					return count++;
				}
				return null;
			});
			return count;
		}

		const raw = convertToRaw(editorState.getCurrentContent());
		console.log(raw);
		raw.blocks.map((block) => {
			block.inlineStyleRanges.map((range, index) => {
				const formatChar = getFormatChar(range);
				const charsInsertedAtStart = countChars(
					block.text.substring(0, range.offset + 1)
				);
				const charsInsertedAtMiddle = countChars(
					block.text.substring(
						range.offset + charsInsertedAtStart,
						range.offset + charsInsertedAtStart + range.length
					)
				);
				console.log(`[${index}]`, charsInsertedAtStart, "chars at start");
				console.log(`[${index}]`, charsInsertedAtMiddle, "chars at middle");
				console.log(`[${index}]`, formatChar, "format char");
				console.log(`[${index}]`, range.offset, "offset");
				console.log(`[${index}]`, block.text, "- block text");

				const newBlockText =
					block.text.substring(0, range.offset + charsInsertedAtStart) +
					formatChar +
					block.text.substring(
						range.offset + charsInsertedAtStart,
						range.offset +
							charsInsertedAtStart +
							charsInsertedAtMiddle +
							range.length
					) +
					formatChar +
					block.text.substring(
						range.offset +
							charsInsertedAtStart +
							charsInsertedAtMiddle +
							+range.length
					);
				console.log(newBlockText);
				return (block.text = newBlockText);
			});
			return block.text;
		});
		const whatsappFormatted = EditorState.createWithContent(convertFromRaw(raw))
			.getCurrentContent()
			.getPlainText();
		console.log(whatsappFormatted, "- whatsapp formatted");
		setWhatsappFormat(whatsappFormatted);
	}, [editorState]);

	return (
		<Background>
			<Message>
				<Editor
					editorState={editorState}
					onChange={onChange}
					handleKeyCommand={handleKeyCommand}
				/>
			</Message>
			<Controls>
				<BoldButton onClick={onBoldClick} />
				<ItalicButton onClick={onItalicClick} />
				<StrikethroughButton onClick={onStrikethroughClick} />
				<CodeButton onClick={onCodeClick} />
				<ClipboardButton
					data-clipboard-text={whatsappFormat}
					id={"clipboard"}
				/>
				<ShareButton />
			</Controls>
		</Background>
	);
}

export default App;
