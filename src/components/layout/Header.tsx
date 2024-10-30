type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <header className="bg-cyan-600 text-white p-4 mb-1 shadow-lg">
    <h1 className="text-2xl font-bold">{title}</h1>
  </header>
);
