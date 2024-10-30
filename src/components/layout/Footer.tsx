type FooterProps = {
  title: string;
};
export const Footer = ({ title }: FooterProps) => (
  <footer className="bg-gray-800 text-white p-4 mt-10 text-center">
    <p>{title}</p>
  </footer>
);
