import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const tools = [
  ['おはらいグローブ', 'card/40291/regu/XY'],
  ['こだわりベルト', 'card/42792/regu/XY'],
  ['災いの箱', 'card/41585/regu/XY'],
];

const theme = {
  color: 'rgb(255, 255, 255)',
  background: 'rgb(50, 50, 50, 0.6)',
  border: 'thick ridge rgb(30, 30, 30, 0.8)',
  padding: '3px 5px',
  nameInnerTextStroke: '3px red',
  nameOuterTextStroke: '8px rgb(255, 255, 255)',
  descInnerTextStroke: '2px red',
  descOuterTextStroke: '6px rgb(255, 255, 255)',
};

test('ポケモンのどうぐ取得', async ({ page }) => {
  for (const [name, url] of tools) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="ポケモンのどうぐ"]');
    header.evaluate((headerElem, { name, theme }) => {
      const { parentNode } = headerElem
      if (!parentNode) throw new Error();

      document.body.style.background = 'rgb(255, 255, 255, 0)';
      const wrapperElem = document.querySelector('.WrapperArea')
      if (!wrapperElem || !(wrapperElem instanceof HTMLElement)) throw new Error();
      wrapperElem.style.background = 'rgb(255, 255, 255, 0)';

      headerElem.textContent = name;
      headerElem.style.marginTop = '0';
      headerElem.style.color = theme.color;
      const descElem = headerElem.nextElementSibling;
      if (!descElem || !(descElem instanceof HTMLElement)) throw new Error();
      descElem.style.marginBottom = '0';
      descElem.style.color = theme.color;

      const headerElem1 = headerElem.cloneNode(true);
      if (!(headerElem1 instanceof HTMLElement)) throw new Error();
      headerElem1.style.webkitTextStroke = theme.nameInnerTextStroke;
      headerElem1.style.position = 'absolute';
      headerElem1.style.top = '0';
      headerElem1.style.left = '5';
      headerElem1.style.zIndex = '-1';

      const headerElem2 = headerElem.cloneNode(true);
      if (!(headerElem2 instanceof HTMLElement)) throw new Error();
      headerElem2.style.webkitTextStroke = theme.nameOuterTextStroke;
      headerElem2.style.position = 'absolute';
      headerElem2.style.top = '0';
      headerElem2.style.left = '0';
      headerElem2.style.zIndex = '-2';

      const headerBoxElem = document.createElement('div');
      headerBoxElem.style.position = 'relative';
      headerBoxElem.style.zIndex = '0';
      headerBoxElem.appendChild(headerElem);
      headerBoxElem.appendChild(headerElem1);
      headerBoxElem.appendChild(headerElem2);

      const descElem1 = descElem.cloneNode(true);
      if (!(descElem1 instanceof HTMLElement)) throw new Error();
      descElem1.style.webkitTextStroke = theme.descInnerTextStroke;
      descElem1.style.position = 'absolute';
      descElem1.style.top = '0';
      descElem1.style.left = '5';
      descElem1.style.zIndex = '-1';

      const descElem2 = descElem.cloneNode(true);
      if (!(descElem2 instanceof HTMLElement)) throw new Error();
      descElem2.style.webkitTextStroke = theme.descOuterTextStroke;
      descElem2.style.position = 'absolute';
      descElem2.style.top = '0';
      descElem2.style.left = '0';
      descElem2.style.zIndex = '-2';

      const descBoxElem = document.createElement('div');
      descBoxElem.style.position = 'relative';
      descBoxElem.style.zIndex = '0';
      descBoxElem.appendChild(descElem);
      descBoxElem.appendChild(descElem1);
      descBoxElem.appendChild(descElem2);

      const box = document.createElement('div');
      box.id = 'box';
      box.style.background = theme.background;
      box.style.border = theme.border;
      box.style.padding = theme.padding;
      box.appendChild(headerBoxElem);
      box.appendChild(descBoxElem);
      parentNode.append(box);
    }, { name, theme });

    await page.locator('#box').screenshot({ path });
  }
});
