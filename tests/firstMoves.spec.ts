import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const firstMoves = [
  ['アビスシーク', 'card/42371/regu/XY'],
  ['クロスフュージョン', 'card/42315/regu/XY'],
  ['テクノバスター210', 'card/42363/regu/XY'],
  ['ひっかく20', 'card/41848/regu/XY'],
  ['ヘイルブレード60x', 'card/43235/regu/XY'],
];

test('1番目のワザ取得', async ({ page }) => {
  for (const [name, url] of firstMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="ワザ"]');
    header.evaluate((headerElem, name) => {
      const { parentNode } = headerElem
      if (!parentNode) throw new Error();

      const nameElem = headerElem.nextElementSibling;
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
