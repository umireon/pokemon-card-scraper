import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  renderFirstNameDesc,
  renderWithImage
} from './helpers';

const abilities = [
  ['かくしふだ', 'card/41212/regu/XY'],
  ['きょくていおん', 'card/43234/regu/XY'],
  ['しっこくのわざわい', 'card/43164/regu/XY'],
  ['ねっけつレッスン', 'card/42283/regu/XY'],
  ['ルミナスサイン', 'card/42794/regu/XY'],
  ['わななくれいき', 'card/43235/regu/XY'],
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

test('特性取得', async ({ page }) => {
  for (const [name, url] of abilities) {
    const pathSubtitle = `outputs/字幕のみ/${name}.png`;
    const pathBox = `outputs/フルサイズ/${name}.png`;
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="特性"]');
    await header.evaluate(renderFirstNameDesc, { theme });
    await page.locator('#subtitle').screenshot({ path: pathSubtitle, omitBackground: true });
    await page.locator('.RightBox-inner').evaluate(renderWithImage);
    await page.locator('#box').screenshot({ path: pathBox, omitBackground: true });
  }
});
