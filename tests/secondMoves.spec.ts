import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const secondMoves = [
  ['ひきさく160', 'card/42371/regu/XY'],
  ['ダイミラクル130', 'card/42315/regu/XY'],
  ['ロストマイン', 'card/41848/regu/XY'],
];

test('2番目のワザ取得', async ({ page }) => {
  for (const [name, url] of secondMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="ワザ"]');
    header.evaluate((headerElem, name) => {
      const { parentNode } = headerElem
      if (!parentNode) throw new Error();

      const nameElem = headerElem.nextElementSibling?.nextElementSibling?.nextElementSibling;
      if (!nameElem) throw new Error();
      const descElem = nameElem.nextElementSibling;
      if (!descElem) throw new Error();

      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descElem);
      parentNode.append(box);
    }, name);

    await page.locator('#box').screenshot({ path });
  }
});
