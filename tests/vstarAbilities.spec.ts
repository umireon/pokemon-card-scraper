import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc
} from './helpers';

const vstarAbilities = [
  ['スターアルケミー', 'card/42184/regu/XY'],
  ['スターバース', 'card/42388/regu/XY'],
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

test('VSTARパワーの特性取得', async ({ page }) => {
  for (const [name, url] of vstarAbilities) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h4[text()="特性"]');
    await header.evaluate(renderFirstNameDesc, { theme });
    await page.locator('#box').screenshot({ path, omitBackground: true });
  }
});
