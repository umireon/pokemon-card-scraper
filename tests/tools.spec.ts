import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc
} from './helpers';

const tools = [
  ['おはらいグローブ', 'card/40291/regu/XY'],
  ['こだわりベルト', 'card/42792/regu/XY'],
  ['災いの箱', 'card/41585/regu/XY'],
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

test('ポケモンのどうぐ取得', async ({ page }) => {
  for (const [name, url] of tools) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ポケモンのどうぐ"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#box').screenshot({ path, omitBackground: true });
  }
});
