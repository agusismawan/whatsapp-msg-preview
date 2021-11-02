import { BgMask, Container } from "./styles";

type BackgroundProps = {
	children: React.ReactNode;
};

export default function Background({ children }: BackgroundProps) {
	return (
		<Container>
			<BgMask />
			{children}
		</Container>
	);
}
