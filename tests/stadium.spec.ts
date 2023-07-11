import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const studiums = [
  ['崩れたスタジアム', 'card/42428/regu/XY'],
  ['頂への雪道', 'card/42812/regu/XY'],
  ['ロストシティ', 'card/41903/regu/XY'],
  ['スケーターズパーク', 'card/40061/regu/XY'],
  ['ポケストップ', 'card/41752/regu/XY'],
];

test('グッズ取得', async ({ page }) => {
  for (const [name, url] of studiums) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="スタジアム"]');
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
