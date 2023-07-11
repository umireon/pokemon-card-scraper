import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const energies = [
  ['ジェットエネルギー', 'card/43037/regu/XY'],
  ['ダブルターボエネルギー', 'card/42814/regu/XY'],
];

test('特殊エネルギー取得', async ({ page }) => {
  for (const [name, url] of energies) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="特殊エネルギー"]');
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
