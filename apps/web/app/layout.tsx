import { ReactNode } from 'react';
import './globals.css';
import { interFont } from '../shared/ui/fonts';

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body className={interFont.className}>{children}</body>
		</html>
	);
};

export default RootLayout;
