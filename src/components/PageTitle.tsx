type Props = {
  children: string;
};

export default function PageTitle({ children }: Props) {
  return <h1 className="text-lg font-medium md:text-xl">{children}</h1>;
}
