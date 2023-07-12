import { test } from '@playwright/test';
import { baseUrl, exists } from './helpers'

const secondMoves = [
  ['ひきさく160', 'card/42371/regu/XY'],
  ['ダイミラクル130', 'card/42315/regu/XY'],
  ['ロストマイン', 'card/41848/regu/XY'],
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

test('2番目のワザ取得', async ({ page }) => {
  for (const [name, url] of secondMoves) {
    const path = `outputs/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);

    const header = page.locator('//h2[text()="ワザ"]');
    header.evaluate((headerElem, { theme }) => {
      const { parentNode } = headerElem
      if (!parentNode) throw new Error();

      document.body.style.background = 'rgb(255, 255, 255, 0)';
      const wrapperElem = document.querySelector('.WrapperArea')
      if (!wrapperElem || !(wrapperElem instanceof HTMLElement)) throw new Error();
      wrapperElem.style.background = 'rgb(255, 255, 255, 0)';


      const nameElem = headerElem.nextElementSibling?.nextElementSibling?.nextElementSibling;
      if (!nameElem || !(nameElem instanceof HTMLElement)) throw new Error();
      nameElem.style.marginTop = '0';
      nameElem.style.color = theme.color;
      const descElem = nameElem.nextElementSibling;
      if (!descElem || !(descElem instanceof HTMLElement)) throw new Error();
      descElem.style.marginBottom = '0';
      descElem.style.color = theme.color;

      const nameElem1 = nameElem.cloneNode(true);
      if (!(nameElem1 instanceof HTMLElement)) throw new Error();
      nameElem1.style.webkitTextStroke = theme.nameInnerTextStroke;
      nameElem1.style.position = 'absolute';
      nameElem1.style.top = '0';
      nameElem1.style.left = '5';
      nameElem1.style.width = '100%';
      nameElem1.style.zIndex = '-1';

      const nameElem2 = nameElem.cloneNode(true);
      if (!(nameElem2 instanceof HTMLElement)) throw new Error();
      nameElem2.style.webkitTextStroke = theme.nameOuterTextStroke;
      nameElem2.style.position = 'absolute';
      nameElem2.style.top = '0';
      nameElem2.style.left = '0';
      nameElem2.style.width = '100%';
      nameElem2.style.zIndex = '-2';

      const nameBoxElem = document.createElement('div');
      nameBoxElem.style.position = 'relative';
      nameBoxElem.style.zIndex = '0';
      nameBoxElem.appendChild(nameElem);
      nameBoxElem.appendChild(nameElem1);
      nameBoxElem.appendChild(nameElem2);

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
      box.appendChild(nameBoxElem);
      box.appendChild(descBoxElem);
      parentNode.append(box);
    }, { theme });

    await page.locator('#box').screenshot({ path });
  }
});
