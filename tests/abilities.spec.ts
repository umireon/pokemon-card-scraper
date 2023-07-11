import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const abilities = [
  ['かくしふだ', 'card/41212/regu/XY'],
  ['きょくていおん', 'card/43234/regu/XY'],
  ['しっこくのわざわい', 'card/43164/regu/XY'],
  ['ねっけつレッスン', 'card/42283/regu/XY'],
  ['ルミナスサイン', 'card/42794/regu/XY'],
  ['わななくれいき', 'card/43235/regu/XY'],
];

test('特性取得', async ({ page }) => {
  for (const [name, url] of abilities) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="特性"]');
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
