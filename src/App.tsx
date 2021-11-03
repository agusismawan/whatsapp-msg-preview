import React, { useState } from "react";
import "./App.css";
import "./normalize.css";
import Message from "./components/Message";
import Background from "./components/Background";
import { Editor, EditorState, RichUtils, DraftEditorCommand } from "draft-js";
import "draft-js/dist/Draft.css";
import {
	BoldButton,
	CodeButton,
	Controls,
	ItalicButton,
	StrikethroughButton,
	UnderlineButton,
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
	};
	const onItalicClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
	};
	const onUnderlineClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
	};
	const onStrikethroughClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "MONOSPACE"));
	};
	const onCodeClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "CODE"));
	};

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
				<UnderlineButton onClick={onUnderlineClick} />
				<StrikethroughButton onClick={onStrikethroughClick} />
				<CodeButton onClick={onCodeClick} />
			</Controls>
		</Background>
	);
}

export default App;
