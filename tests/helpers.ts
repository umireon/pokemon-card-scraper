import { access } from "node:fs/promises";

export const baseUrl = "https://www.pokemon-card.com/card-search/details.php";

export async function exists(path: string) {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}

export interface RenderNameDescOptions {
  readonly theme: Theme;
  readonly prefix?: string;
}

interface GetOutputPathsResult {
  readonly pathBox: string;
  readonly pathSubtitle: string;
}

export function getOutputPaths(name: string): GetOutputPathsResult {
  return {
    pathBox: `カードテキスト/画像つき/${name}.png`,
    pathSubtitle: `カードテキスト/字幕のみ/${name}.png`,
  };
}

export function resetStyle(wrapperElem: HTMLElement) {
  document.body.style.background = "transparent";
  wrapperElem.style.background = "transparent";
}

interface AddPrefixArg {
  readonly prefix: string;
}

export function addPrefix(elem: HTMLElement, { prefix }: AddPrefixArg) {
  elem.textContent = prefix + elem.textContent;
}

export interface CreateTitleArg {
  readonly id: string;
  readonly name: string;
}

export function createTitle(
  parentElem: HTMLElement,
  { id, name }: CreateTitleArg,
) {
  const elem = document.createElement("h4");
  elem.id = id;
  elem.textContent = name;
  parentElem.append(elem);
  return elem;
}

export interface RenderStrokeArg {
  readonly id: string;
  readonly color: string;
  readonly innerStroke: string;
  readonly outerStroke: string;
}

export function renderStroke(
  elem: HTMLElement,
  { id, color, innerStroke, outerStroke }: RenderStrokeArg,
): HTMLElement {
  elem.style.marginBottom = "0";
  elem.style.color = color;

  const innerElem = elem.cloneNode(true);
  if (!(innerElem instanceof HTMLElement))
    throw new Error("The provided node is not HTMLElement!");
  innerElem.style.webkitTextStroke = innerStroke;
  innerElem.style.position = "absolute";
  innerElem.style.top = "0";
  innerElem.style.left = "0";
  innerElem.style.width = "100%";
  innerElem.style.zIndex = "-1";

  const outerElem = elem.cloneNode(true);
  if (!(outerElem instanceof HTMLElement))
    throw new Error("The provided node is not HTMLElement!");
  outerElem.style.webkitTextStroke = outerStroke;
  outerElem.style.position = "absolute";
  outerElem.style.top = "0";
  outerElem.style.left = "0";
  outerElem.style.width = "100%";
  outerElem.style.zIndex = "-2";

  const containerElem = document.createElement("div");
  containerElem.id = id;
  containerElem.style.position = "relative";
  containerElem.style.zIndex = "0";
  containerElem.appendChild(elem);
  containerElem.appendChild(innerElem);
  containerElem.appendChild(outerElem);

  return containerElem;
}

export interface RenderSubtitleArg {
  readonly titleElem: HTMLElement;
  readonly descElem: HTMLElement;
  readonly background: string;
  readonly border: string;
  readonly padding: string;
  readonly id: string;
  readonly width: string;
}

export async function renderSubtitle(
  parentElem: HTMLElement,
  {
    descElem,
    titleElem,
    background,
    border,
    padding,
    id,
    width,
  }: RenderSubtitleArg,
): HTMLElement {
  const subtitle = document.createElement("div");
  subtitle.id = id;
  subtitle.style.marginTop = "1em";
  subtitle.style.background = background;
  subtitle.style.border = border;
  subtitle.style.padding = padding;
  subtitle.style.display = "inline-block";
  subtitle.style.width = width;
  subtitle.style.boxSizing = "border-withImageElem";
  subtitle.appendChild(titleElem);
  subtitle.appendChild(descElem);

  parentElem.append(subtitle);

  return subtitle;
}

interface RenderWithImageArg {
  readonly borderRadius: string;
  readonly id: string;
  readonly imageWidth: number;
  readonly marginRight: string;
  readonly width: string;
  readonly subtitleElem: HTMLElement;
  readonly imageElem: HTMLImageElement;
}

export function renderWithImage(
  parentElem: HTMLElement,
  {
    borderRadius,
    id,
    imageWidth,
    marginRight,
    width,
    subtitleElem,
    imageElem,
  }: RenderWithImageArg,
): HTMLElement {
  imageElem.width = imageWidth;
  imageElem.style.borderRadius = borderRadius;
  imageElem.style.marginRight = marginRight;

  const withImageElem = document.createElement("div");
  withImageElem.id = id;
  withImageElem.style.marginTop = "1em";
  withImageElem.style.background = "transparent";
  withImageElem.style.display = "inline-block";
  withImageElem.style.width = width;
  withImageElem.appendChild(imageElem);
  withImageElem.appendChild(subtitleElem);
  parentElem.append(withImageElem);

  return withImageElem;
}

export interface Theme {
  readonly withImage: Omit<RenderWithImageArg, "imageElem" | "subtitleElem">;
  readonly subtitle: Omit<RenderSubtitleArg, "titleElem" | "descElem">;
  readonly title: RenderStrokeArg;
  readonly desc: RenderStrokeArg;
}
