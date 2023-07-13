import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc,
  renderWithImage
} from './helpers';

const tools = [
  ['おはらいグローブ', 'card/40291/regu/XY'],
  ['こだわりベルト', 'card/42792/regu/XY'],
  ['災いの箱', 'card/41585/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(112, 78, 155, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(112, 78, 155)',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(112, 78, 155)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('ポケモンのどうぐ取得', async ({ page }) => {
  for (const [name, url] of tools) {
    const pathSubtitle = `素材/字幕のみ/${name}.png`;
    const pathBox = `素材/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ポケモンのどうぐ"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
