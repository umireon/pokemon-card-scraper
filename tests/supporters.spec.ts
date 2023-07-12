import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc,
  renderWithImage
} from './helpers';

const supporters = [
  ['アクロマの実験', 'card/42409/regu/XY'],
  ['ジャッジマン', 'card/43832/regu/XY'],
  ['ナンジャモ', 'card/43205/regu/XY'],
  ['ボスの指令', 'card/43840/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(236, 86, 1, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(236, 86, 1)',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(236, 86, 1)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('サポート取得', async ({ page }) => {
  for (const [name, url] of supporters) {
    const pathSubtitle = `outputs/字幕のみ/${name}.png`;
    const pathBox = `outputs/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="サポート"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
