import { access } from 'node:fs/promises';

export const baseUrl = 'https://www.pokemon-card.com/card-search/details.php';

export async function exists(path: string) {
  try {
    await access(path);
    return true
  } catch (e) {
    return false;
  }
}

export interface Theme {
  color: string;
  background: string;
  border: string;
  padding: string;
  nameInnerTextStroke: string;
  nameOuterTextStroke: string;
  descInnerTextStroke: string;
  descOuterTextStroke: string;
}

export interface RenderNameDescOptions {
  theme: Theme
}

export function renderFirstNameDesc(headerElem: HTMLElement, { theme }: RenderNameDescOptions) {
  const { parentNode } = headerElem
  if (!parentNode) throw new Error();

  document.body.style.background = 'rgb(255, 255, 255, 0)';
  const wrapperElem = document.querySelector('.WrapperArea')
  if (!wrapperElem || !(wrapperElem instanceof HTMLElement)) throw new Error();
  wrapperElem.style.background = 'rgb(255, 255, 255, 0)';

  const nameElem = headerElem.nextElementSibling;
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
  nameElem1.style.left = '0';
  nameElem1.style.zIndex = '-1';

  const nameElem2 = nameElem.cloneNode(true);
  if (!(nameElem2 instanceof HTMLElement)) throw new Error();
  nameElem2.style.webkitTextStroke = theme.nameOuterTextStroke;
  nameElem2.style.position = 'absolute';
  nameElem2.style.top = '0';
  nameElem2.style.left = '0';
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
  descElem1.style.left = '0';
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
}

export function renderSecondNameDesc(headerElem: HTMLElement, { theme }: RenderNameDescOptions) {
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
  nameElem1.style.left = '0';
  nameElem1.style.zIndex = '-1';

  const nameElem2 = nameElem.cloneNode(true);
  if (!(nameElem2 instanceof HTMLElement)) throw new Error();
  nameElem2.style.webkitTextStroke = theme.nameOuterTextStroke;
  nameElem2.style.position = 'absolute';
  nameElem2.style.top = '0';
  nameElem2.style.left = '0';
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
  descElem1.style.left = '0';
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
}

export interface RenderHeaderDescOptions {
  name: string;
  theme: Theme;
}

export function renderHeaderDesc(headerElem: HTMLElement, { name, theme }: RenderHeaderDescOptions) {
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
}
