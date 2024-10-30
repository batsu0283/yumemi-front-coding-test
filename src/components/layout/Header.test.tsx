import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("指定されたタイトルが表示されること", () => {
    const testTitle = "ヘッダーのテストタイトル";
    render(<Header title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it("headerの要素が存在すること", () => {
    render(<Header title="ヘッダータイトル" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Snapshot", () => {
    const { container } = render(<Header title="ヘッダータイトル" />);
    expect(container).toMatchSnapshot();
  });
});
