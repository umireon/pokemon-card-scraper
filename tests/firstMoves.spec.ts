import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc,
  renderWithImage
} from './helpers';

const firstMoves = [
  ['アビスシーク', 'card/42371/regu/XY'],
  ['クロスフュージョン', 'card/42315/regu/XY'],
  ['テクノバスター210', 'card/42363/regu/XY'],
  ['ひっかく20', 'card/41848/regu/XY'],
  ['ヘイルブレード60x', 'card/43235/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(30, 30, 30, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(30, 30, 30)',
  nameOuterTextStroke: '7px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(30, 30, 30)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('1番目のワザ取得', async ({ page }) => {
  for (const [name, url] of firstMoves) {
    const pathSubtitle = `outputs/字幕のみ/${name}.png`;
    const pathBox = `outputs/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ワザ"]');
    await header.evaluate(renderFirstNameDesc, { theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
