import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderHeaderDesc,
  renderWithImage
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
  subtitleBackground: 'rgb(50, 50, 50, 0.6)',
  subtitleBorder: 'thick ridge rgb(47, 170, 47, 0.8)',
  subtitlePadding: '3px 5px',
  nameInnerTextStroke: '5px rgb(47, 170, 47)',
  nameOuterTextStroke: '7px rgb(255, 255, 255)',
  descInnerTextStroke: '3px rgb(47, 170, 47)',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('スタジアム取得', async ({ page }) => {
  for (const [name, url] of studiums) {
    const pathSubtitle = `カードテキスト/字幕のみ/${name}.png`;
    const pathBox = `カードテキスト/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="スタジアム"]');
    await header.evaluate(renderHeaderDesc, { name, theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
