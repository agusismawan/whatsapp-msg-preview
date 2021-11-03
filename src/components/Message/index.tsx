import { format } from "date-fns";
import { HTMLAttributes, useEffect, useState } from "react";
import DoubleCheck from "./DoubleCheck";
import { Hour, MessageContainer } from "./styles";

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
	message?: string;
}

export default function Message({ message, children, ...rest }: MessageProps) {
	const [hour, setHour] = useState(new Date());
	useEffect(() => {
		const updateHour = () => setHour(new Date());
		const interval = setInterval(updateHour, 5 * 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<MessageContainer {...rest}>
			{children}
			<Hour> {format(hour, "HH:mm")} </Hour>
			<DoubleCheck />
		</MessageContainer>
	);
}
