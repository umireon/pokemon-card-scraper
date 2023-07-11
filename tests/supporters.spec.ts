import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const supporters = [
  ['アクロマの実験', 'card/42409/regu/XY'],
  ['ナンジャモ', 'card/43205/regu/XY'],
  ['ボスの指令', 'card/43840/regu/XY'],
  ['ジャッジマン', 'card/43832/regu/XY'],
];

test('サポート取得', async ({ page }) => {
  for (const [name, url] of supporters) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="サポート"]');
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
