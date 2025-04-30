import * as style from "./style";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className={style.container()}>
      <h6 className={style.label()}>{label}</h6>
      <input {...props} className={style.input()} />
    </div>
  );
};

export default Input;
