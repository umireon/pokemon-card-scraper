import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc,
  renderWithImage
} from './helpers';

const energies = [
  ['ジェットエネルギー', 'card/43037/regu/XY'],
  ['ダブルターボエネルギー', 'card/42814/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(50, 50, 50, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(50, 50, 50)',
  nameOuterTextStroke: '7px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(50, 50, 50)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('特殊エネルギー取得', async ({ page }) => {
  for (const [name, url] of energies) {
    const pathSubtitle = `カードテキスト/字幕のみ/${name}.png`;
    const pathBox = `カードテキスト/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="特殊エネルギー"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
