import type { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return <main className="container mx-auto p-10">{children}</main>;
};
