import React, { useEffect, useState } from "react";
import "./App.css";
import "./normalize.css";
import Message from "./components/Message";
import Background from "./components/Background";
import {
	Editor,
	EditorState,
	RichUtils,
	DraftEditorCommand,
	convertToRaw,
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
		console.log(convertToRaw(editorState.getCurrentContent()));
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

	useEffect(() => {
		const raw = convertToRaw(editorState.getCurrentContent());
		console.log(raw);
		const styleApplied = raw.blocks.map((block) => {
			block.inlineStyleRanges.map((range, index) => {
				let formatChar = "";
				switch (range.style) {
					case "BOLD":
						formatChar = "*";
						break;
					case "ITALIC":
						formatChar = "_";
						break;
					case "STRIKETHROUGH":
						formatChar = "~";
						break;
					case "CODE":
						formatChar = "```";
						break;
				}
				const newBlockText =
					block.text.substring(0, range.offset + index) +
					formatChar +
					block.text.substring(
						range.offset + index,
						range.offset + index + range.length
					) +
					formatChar +
					block.text.substring(range.offset + index + range.length);
				// block.text.substring(range.offset + index);
				console.log(newBlockText);
				return (block.text = newBlockText);
			});
			return block.text;
		});
		//this.substring(0, index) + string + this.substr(index)
		const whatsappFormatted = styleApplied.reduce(
			(acc, curr) => acc + curr,
			""
		);
		console.log(whatsappFormatted);
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
				<ClipboardButton />
				<ShareButton />
			</Controls>
		</Background>
	);
}

export default App;
