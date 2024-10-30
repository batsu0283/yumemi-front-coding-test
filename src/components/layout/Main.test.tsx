import { render, screen } from "@testing-library/react";
import { Main } from "./Main";

describe("Main", () => {
  it("子要素が正しくレンダリングされること", () => {
    render(
      <Main>
        <p>テスト用の子要素</p>
      </Main>,
    );
    expect(screen.getByText("テスト用の子要素")).toBeInTheDocument();
  });

  it("mainの要素が存在すること", () => {
    render(
      <Main>
        <p>Another Child</p>
      </Main>,
    );
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("複数の子要素をレンダリングできること", () => {
    render(
      <Main>
        <p>子要素1</p>
        <p>子要素2</p>
      </Main>,
    );

    // 複数の子要素が正しく表示されているか確認
    expect(screen.getByText("子要素1")).toBeInTheDocument();
    expect(screen.getByText("子要素2")).toBeInTheDocument();
  });
  it("Snapshot", () => {
    const { container } = render(
      <Main>
        <p>子要素1</p>
        <p>子要素2</p>
      </Main>,
    );
    expect(container).toMatchSnapshot();
  });
});
