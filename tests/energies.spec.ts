import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc
} from './helpers';

const energies = [
  ['ジェットエネルギー', 'card/43037/regu/XY'],
  ['ダブルターボエネルギー', 'card/42814/regu/XY'],
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

test('特殊エネルギー取得', async ({ page }) => {
  for (const [name, url] of energies) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="特殊エネルギー"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#box').screenshot({ path });
  }
});
