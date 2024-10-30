import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer コンポーネント', () => {
  it('指定されたタイトルが表示されること', () => {
    const testTitle = 'フッターのテストタイトル';

    // Footer コンポーネントを描画
    render(<Footer title={testTitle} />);

    // タイトルが正しく表示されているか確認
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('footer 要素が存在すること', () => {
    render(<Footer title="フッタータイトル" />);

    // footer 要素が存在するか確認
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});