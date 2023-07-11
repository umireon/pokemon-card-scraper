import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const items = [
  ['あなぬけのヒモ', 'card/40832/regu/XY'],
  ['ウッウロボ', 'card/39668/regu/XY'],
  ['エネルギー回収', 'card/43812/regu/XY'],
  ['クロススイッチャー', 'card/40052/regu/XY'],
  ['スーパーエネルギー回収', 'card/43029/regu/XY'],
  ['すごいつりざお', 'card/43273/regu/XY'],
  ['ネストボール', 'card/43820/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['バトルVIPパス', 'card/40053/regu/XY'],
  ['ふしぎなアメ', 'card/43822/regu/XY'],
  ['ポケモンいれかえ', 'card/43824/regu/XY'],
  ['ミラージュゲート', 'card/42402/regu/XY'],
];

test('グッズ取得', async ({ page }) => {
  for (const [name, url] of items) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="グッズ"]');
    header.evaluate((headerElem, name) => {
      const { parentNode } = headerElem
      if (!parentNode) throw new Error();

      headerElem.textContent = name;
      const descElem = headerElem.nextElementSibling;
      if (!descElem) throw new Error();

      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(headerElem);
      box.appendChild(descElem);
      parentNode.append(box);
    }, name);

    await page.locator('#box').screenshot({ path });
  }
});
