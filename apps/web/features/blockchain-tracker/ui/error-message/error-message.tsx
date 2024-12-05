import { ErrorMessageProps } from './error-message.props';

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return <p className="text-3xl text-[#D42323]">{message}</p>;
};
