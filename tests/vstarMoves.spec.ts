import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc,
  renderWithImage,
  resetStyle
} from './helpers';

const vstarMoves = [
  ['スターレクイエム', 'card/41885/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: '10px ridge rgb(255, 249, 151, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(50, 50, 50)',
  nameOuterTextStroke: '7px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(50, 50, 50)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('VSTARパワーのワザ取得', async ({ page }) => {
  for (const [name, url] of vstarMoves) {
    const pathSubtitle = `カードテキスト/字幕のみ/${name}.png`;
    const pathBox = `カードテキスト/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator('.WrapperArea').evaluate(resetStyle);
    const header = page.locator('//h4[text()="ワザ"]');
    await header.evaluate(renderFirstNameDesc, { theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
