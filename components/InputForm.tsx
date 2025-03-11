export default function InputForm({
  type,
  title,
  placeholder,
  text,
  onChange,
  otherClass,
}: {
  type?: "text" | "number" | "password" | "email";
  title: string;
  placeholder?: string;
  text: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  otherClass?: string;
}) {
  return (
    <label className={`form-control w-full max-w-xs ${otherClass}`}>
      <div className="label">
        <span className="label-text text-black">{title}</span>
      </div>
      <input
        type={type ?? "text"}
        placeholder={`${placeholder ?? ""}`}
        className="input input-bordered w-full max-w-xs text-white bg-slate-800"
        value={text}
        onChange={onChange}
      />
    </label>
  );
}
