import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc,
  renderWithImage
} from './helpers';

const items = [
  ['あなぬけのヒモ', 'card/40832/regu/XY'],
  ['ウッウロボ', 'card/39668/regu/XY'],
  ['エネルギー回収', 'card/43812/regu/XY'],
  ['クロススイッチャー', 'card/40052/regu/XY'],
  ['スーパーエネルギー回収', 'card/43029/regu/XY'],
  ['すごいつりざお', 'card/43273/regu/XY'],
  ['ネストボール', 'card/43820/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['バトルVIPパス', 'card/40053/regu/XY'],
  ['ふしぎなアメ', 'card/43822/regu/XY'],
  ['ポケモンいれかえ', 'card/43824/regu/XY'],
  ['ミラージュゲート', 'card/42402/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(30, 30, 30, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '3px red',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '2px red',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('グッズ取得', async ({ page }) => {
  for (const [name, url] of items) {
    const pathSubtitle = `outputs/字幕のみ/${name}.png`;
    const pathBox = `outputs/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="グッズ"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
