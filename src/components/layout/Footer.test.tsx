import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("指定されたタイトルが表示されること", () => {
    const testTitle = "フッターのテストタイトル";
    render(<Footer title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it("footerの要素が存在すること", () => {
    render(<Footer title="フッタータイトル" />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("Snapshot", () => {
    const { container } = render(<Footer title="タイトル" />);
    expect(container).toMatchSnapshot();
  });
});
