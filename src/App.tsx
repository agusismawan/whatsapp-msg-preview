import React, { useState } from "react";
import "./App.css";
import "./normalize.css";
import Message from "./components/Message";
import Background from "./components/Background";
import { Editor, EditorState, RichUtils, DraftEditorCommand } from "draft-js";
import "draft-js/dist/Draft.css";

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
	return (
		<Background>
			<Message>
				<Editor
					editorState={editorState}
					onChange={onChange}
					handleKeyCommand={handleKeyCommand}
				/>
			</Message>
		</Background>
	);
}

export default App;
