import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderSecondNameDesc
} from './helpers';

const secondMoves = [
  ['ひきさく160', 'card/42371/regu/XY'],
  ['ダイミラクル130', 'card/42315/regu/XY'],
  ['ロストマイン', 'card/41848/regu/XY'],
];

const theme = {
  color: 'rgb(255, 255, 255)',
  background: 'rgb(50, 50, 50, 0.6)',
  border: 'thick ridge rgb(30, 30, 30, 0.8)',
  padding: '3px 5px',
  nameInnerTextStroke: '3px red',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '2px red',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('2番目のワザ取得', async ({ page }) => {
  for (const [name, url] of secondMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ワザ"]');
    await header.evaluate(renderSecondNameDesc, { theme });
    await page.locator('#box').screenshot({ path });
  }
});
