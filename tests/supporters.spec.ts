import { test } from "@playwright/test";
import {
  type Theme,
  baseUrl,
  createTitle,
  exists,
  getOutputPaths,
  renderStroke,
  renderSubtitle,
  renderWithImage,
  resetStyle,
} from "./helpers";

const supporters = [
  ["アクロマの実験", "card/42409/regu/XY"],
  ["ジャッジマン", "card/43832/regu/XY"],
  ["ジャッジマン（SWSH）", "card/42024/regu/XY"],
  ["チェレンの気くばり", "card/40996/regu/XY"],
  ["ナンジャモ", "card/43205/regu/XY"],
  ["ボスの指令", "card/43840/regu/XY"],
  ["ボスの指令（フラダリ）", "card/38882/regu/XY"],
  ["ボスの指令（アカギ）", "card/38882/regu/XY"],
  ["ツツジ", "card/41251/regu/XY"],
  ["暗号マニアの解読", "card/45284/regu/XY"],
  ["ペパー", "card/45333/regu/XY"],
];

const theme: Theme = {
  withImage: {
    borderRadius: "12px",
    id: "with-image",
    imageWidth: 200,
    marginRight: "-100px",
    width: "600px",
  },
  subtitle: {
    id: "subtitle",
    background: "rgb(50, 50, 50, 0.6)",
    border: "thick ridge rgb(236, 86, 1, 0.8)",
    padding: "3px 5px",
    width: "400px",
  },
  title: {
    color: "rgb(255, 255, 255)",
    id: "name-container",
    innerStroke: "5px rgb(236, 86, 1)",
    outerStroke: "7px rgb(255, 255, 255)",
  },
  desc: {
    color: "rgb(255, 255, 255)",
    id: "desc-container",
    innerStroke: "3px rgb(236, 86, 1)",
    outerStroke: "6px rgb(255, 255, 255)",
  },
};

test("サポート取得", async ({ page }) => {
  for (const [filename, url] of supporters) {
    const { pathBox, pathSubtitle } = getOutputPaths(filename);
    if ((await exists(pathSubtitle)) && (await exists(pathBox))) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator(".WrapperArea").evaluate(resetStyle);
    const parent = page.locator(".RightBox-inner");
    const name = filename.replace(/（.*）/, '');
    await parent.evaluate(createTitle, { id: "title", name });
    const titleHandle = await page
      .locator("#title")
      .evaluateHandle(renderStroke, theme.title);
    const descHandle = await page
      .locator('//h2[text()="サポート"]/following-sibling::p[1]')
      .evaluateHandle(renderStroke, theme.desc);
    const subtitleHandle = await parent.evaluateHandle(renderSubtitle, {
      ...theme.subtitle,
      titleElem: titleHandle,
      descElem: descHandle,
    });
    const imageHandle = await page
      .locator(".LeftBox > img:first-child")
      .evaluateHandle((e) => e);
    await page
      .locator(`#${theme.subtitle.id}`)
      .screenshot({ path: pathSubtitle, omitBackground: true });
    await parent.evaluate(renderWithImage, {
      ...theme.withImage,
      imageElem: imageHandle,
      subtitleElem: subtitleHandle,
    });
    await page
      .locator(`#${theme.withImage.id}`)
      .screenshot({ path: pathBox, omitBackground: true });
  }
});
