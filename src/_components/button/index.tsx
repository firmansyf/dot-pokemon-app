type Props = {
  children: React.ReactNode;
  color: string;
  istype?: "submit" | "button" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  color,
  istype = "submit",
  onClick,
}: Props) {
  return (
    <button
      className={`border-0 focus:outline-none rounded sm:mt-0 ${color}`}
      type={istype}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
