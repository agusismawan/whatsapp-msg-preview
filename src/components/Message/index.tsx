import { HTMLAttributes } from "react";
import { MessageContainer } from "./styles";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
	message?: string;
}

export default function Message({ message, children, ...rest }: MessageProps) {
	return <MessageContainer {...rest}>{children}</MessageContainer>;
}
