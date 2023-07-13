import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc,
  renderWithImage,
  resetStyle
} from './helpers';

const vstarAbilities = [
  ['スターアルケミー', 'card/42184/regu/XY'],
  ['スターバース', 'card/42388/regu/XY'],
];

const theme: Theme = {
  color: 'rgb(255, 255, 255)',
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: '10px ridge rgb(255, 249, 151, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(208, 0, 14)',
  nameOuterTextStroke: '7px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(208, 0, 14)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('VSTARパワーの特性取得', async ({ page }) => {
  for (const [name, url] of vstarAbilities) {
    const pathSubtitle = `カードテキスト/字幕のみ/${name}.png`;
    const pathBox = `カードテキスト/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator('.WrapperArea').evaluate(resetStyle);
    const header = page.locator('//h4[text()="特性"]');
    await header.evaluate(renderFirstNameDesc, { theme, prefix: '特性：' });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
