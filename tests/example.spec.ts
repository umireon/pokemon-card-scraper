import { test } from '@playwright/test';
import { access } from 'node:fs/promises';

const baseUrl = 'https://www.pokemon-card.com/card-search/details.php';

const items = [
  ['あなぬけのヒモ', 'card/40832/regu/XY'],
  ['ウッウロボ', 'card/39668/regu/XY'],
  ['エネルギー回収', 'card/43812/regu/XY'],
  ['クロススイッチャー', 'card/40052/regu/XY'],
  ['スーパーエネルギー回収', 'card/43029/regu/XY'],
  ['すごいつりざお', 'card/43273/regu/XY'],
  ['ネストボール', 'card/43820/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['ハイパーボール', 'card/43821/regu/XY'],
  ['バトルVIPパス', 'card/40053/regu/XY'],
  ['ふしぎなアメ', 'card/43822/regu/XY'],
  ['ポケモンいれかえ', 'card/43824/regu/XY'],
  ['ミラージュゲート', 'card/42402/regu/XY'],
];

const tools = [
  ['おはらいグローブ', 'card/40291/regu/XY'],
  ['こだわりベルト', 'card/42792/regu/XY'],
  ['災いの箱', 'card/41585/regu/XY'],
];

const supporters = [
  ['アクロマの実験', 'card/42409/regu/XY'],
  ['ナンジャモ', 'card/43205/regu/XY'],
  ['ボスの指令', 'card/43840/regu/XY'],
  ['ジャッジマン', 'card/43832/regu/XY'],
];

const energies = [
  ['ジェットエネルギー', 'card/43037/regu/XY'],
  ['ダブルターボエネルギー', 'card/42814/regu/XY'],
];

const abilities = [
  ['かくしふだ', 'card/41212/regu/XY'],
  ['きょくていおん', 'card/43234/regu/XY'],
  ['しっこくのわざわい', 'card/43164/regu/XY'],
  ['ルミナスサイン', 'card/42794/regu/XY'],
  ['わななくれいき', 'card/43235/regu/XY'],
  ['かくしふだ', 'card/41212/regu/XY'],
  ['ねっけつレッスン', 'card/42283/regu/XY'],
];

const firstMoves = [
  ['アビスシーク', 'card/42371/regu/XY'],
  ['テクノバスター210', 'card/42363/regu/XY'],
  ['クロスフュージョン', 'card/42315/regu/XY'],
  ['ヘイルブレード60x', 'card/43235/regu/XY'],
  ['ひっかく20', 'card/41848/regu/XY'],
];

const secondMoves = [
  ['ひきさく160', 'card/42371/regu/XY'],
  ['ダイミラクル130', 'card/42315/regu/XY'],
  ['ロストマイン', 'card/41848/regu/XY'],
];

const vstarMoves = [
  ['スターレクイエム', 'card/41885/regu/XY'],
];

const vstarAbilities = [
  ['スターバース', 'card/42388/regu/XY'],
  ['スターアルケミー', 'card/42184/regu/XY'],
];

async function exists(path: string) {
  try {
    await access(path);
    return true
  } catch (e) {
    return false;
  }
}

test('get items', async ({ page }) => {
  for (const [name, url] of simpleItems) {
    const path = `outputs/simpleItems/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="グッズ"]');
    header.evaluate((headerElem, name) => {
      const parent = headerElem.parentNode
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const descriptionElem = childrenArray[indexOfMoveHeader + 1];
      const box = document.createElement('div');
      box.id = 'box';
      headerElem.textContent = name;
      box.appendChild(headerElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    }, name);
    await page.locator('#box').screenshot({ path });
  }
});

test('get tools', async ({ page }) => {
  for (const [name, url] of simpleTools) {
    const path = `outputs/simpleTools/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ポケモンのどうぐ"]');
    header.evaluate((headerElem, name) => {
      const parent = headerElem.parentNode
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const descriptionElem = childrenArray[indexOfMoveHeader + 1];
      const box = document.createElement('div');
      box.id = 'box';
      headerElem.textContent = name;
      box.appendChild(headerElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    }, name);
    await page.locator('#box').screenshot({ path });
  }
});

test('get supporters', async ({ page }) => {
  for (const [name, url] of simpleSupporters) {
    const path = `outputs/simpleSupporters/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="サポート"]');
    header.evaluate((headerElem, name) => {
      const parent = headerElem.parentNode
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const descriptionElem = childrenArray[indexOfMoveHeader + 1];
      const box = document.createElement('div');
      box.id = 'box';
      headerElem.textContent = name;
      box.appendChild(headerElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    }, name);
    await page.locator('#box').screenshot({ path });
  }
});

test('get energies', async ({ page }) => {
  for (const [name, url] of simpleEnergies) {
    const path = `outputs/simpleEnergies/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="特殊エネルギー"]');
    header.evaluate((headerElem, name) => {
      const parent = headerElem.parentNode
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const descriptionElem = childrenArray[indexOfMoveHeader + 1];
      const box = document.createElement('div');
      box.id = 'box';
      headerElem.textContent = name;
      box.appendChild(headerElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    }, name);
    await page.locator('#box').screenshot({ path });
  }
});

test('get abilities', async ({ page }) => {
  for (const [name, url] of simpleAbilities) {
    const path = `outputs/simpleAbilities/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="特性"]');
    header.evaluate(headerElem => {
      const parent = headerElem.parentNode
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children);
      const nextSibling = headerElem.nextSibling;
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const nameElem = childrenArray[indexOfMoveHeader + 1];
      const descriptionElem = childrenArray[indexOfMoveHeader + 2];
      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    })
    await page.locator('#box').screenshot({ path });
  }
});

test('get first moves', async ({ page }) => {
  for (const [name, url] of firstMoves) {
    const path = `outputs/firstMoves/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ワザ"]');
    header.evaluate(headerElem => {
      const parent = headerElem.parentNode;
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const nameElem = childrenArray[indexOfMoveHeader + 1];
      const descriptionElem = childrenArray[indexOfMoveHeader + 2];
      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    })
    await page.locator('#box').screenshot({ path });
  }
});

test('get second moves', async ({ page }) => {
  for (const [name, url] of secondMoves) {
    const path = `outputs/secondMoves/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h2[text()="ワザ"]');
    header.evaluate(headerElem => {
      const parent = headerElem.parentNode;
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const nameElem = childrenArray[indexOfMoveHeader + 3];
      const descriptionElem = childrenArray[indexOfMoveHeader + 4];
      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    })
    await page.locator('#box').screenshot({ path });
  }
});

test('get VSTAR moves', async ({ page }) => {
  for (const [name, url] of vstarMoves) {
    const path = `outputs/vstarMoves/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h4[text()="ワザ"]');
    header.evaluate(headerElem => {
      const parent = headerElem.parentNode;
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const nameElem = childrenArray[indexOfMoveHeader + 1];
      const descriptionElem = childrenArray[indexOfMoveHeader + 2];
      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    })
    await page.locator('#box').screenshot({ path });
  }
});

test('get VSTAR abilities', async ({ page }) => {
  for (const [name, url] of vstarAbilities) {
    const path = `outputs/vstarAbilities/${name}.png`;
    if (await exists(path)) continue;
    await page.goto(`${baseUrl}/${url}`);
    const header = page.locator('//h4[text()="特性"]');
    header.evaluate(headerElem => {
      const parent = headerElem.parentNode;
      const nextSibling = headerElem.nextSibling;
      if (parent === null) throw new Error();
      const childrenArray = Array.from(parent.children)
      const indexOfMoveHeader = childrenArray.indexOf(headerElem);
      const nameElem = childrenArray[indexOfMoveHeader + 1];
      const descriptionElem = childrenArray[indexOfMoveHeader + 2];
      const box = document.createElement('div');
      box.id = 'box';
      box.appendChild(nameElem);
      box.appendChild(descriptionElem);
      parent.insertBefore(box, nextSibling);
    })
    await page.locator('#box').screenshot({ path });
  }
});