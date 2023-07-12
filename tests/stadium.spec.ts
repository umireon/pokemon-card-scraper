import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc
} from './helpers';

const studiums = [
  ['スケーターズパーク', 'card/40061/regu/XY'],
  ['ポケストップ', 'card/41752/regu/XY'],
  ['ロストシティ', 'card/41903/regu/XY'],
  ['頂への雪道', 'card/42812/regu/XY'],
  ['崩れたスタジアム', 'card/42428/regu/XY'],
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

test('スタジアム取得', async ({ page }) => {
  for (const [name, url] of studiums) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="スタジアム"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#box').screenshot({ path });
  }
});
