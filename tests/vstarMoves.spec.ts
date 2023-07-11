import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const vstarMoves = [
  ['スターレクイエム', 'card/41885/regu/XY'],
];

test('VSTARパワーのワザ取得', async ({ page }) => {
  for (const [name, url] of vstarMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h4[text()="ワザ"]');
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
