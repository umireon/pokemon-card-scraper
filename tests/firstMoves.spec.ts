import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc
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
  background: 'rgb(50, 50, 50, 0.6)',
  border: 'thick ridge rgb(30, 30, 30, 0.8)',
  padding: '3px 5px',
  nameInnerTextStroke: '3px red',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '2px red',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('1番目のワザ取得', async ({ page }) => {
  for (const [name, url] of firstMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ワザ"]');
    await header.evaluate(renderFirstNameDesc, { theme });
    await page.locator('#box').screenshot({ path });
  }
});
