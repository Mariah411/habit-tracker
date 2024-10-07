import { FC } from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Button: FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <button className="p-2 bg-indigo-500 text-white rounded-md m-1">
      {children}
    </button>
  );
};

export default Button;
