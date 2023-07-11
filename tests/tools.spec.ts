import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const tools = [
  ['おはらいグローブ', 'card/40291/regu/XY'],
  ['こだわりベルト', 'card/42792/regu/XY'],
  ['災いの箱', 'card/41585/regu/XY'],
];

test('ポケモンのどうぐ取得', async ({ page }) => {
  for (const [name, url] of tools) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="ポケモンのどうぐ"]');
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
