type Props = {
  children: string;
};

export default function AuthFormTitle({ children }: Props) {
  return (
    <h1 className="mb-4 text-center text-2xl font-semibold">{children}</h1>
  );
}
