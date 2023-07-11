import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const vstarAbilities = [
  ['スターアルケミー', 'card/42184/regu/XY'],
  ['スターバース', 'card/42388/regu/XY'],
];

test('VSTARパワーの特性取得', async ({ page }) => {
  for (const [name, url] of vstarAbilities) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h4[text()="特性"]');
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
