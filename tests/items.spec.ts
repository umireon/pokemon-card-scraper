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

const items = [
  ["あなぬけのヒモ", "card/40832/regu/XY"],
  ["いれかえカート", "card/41421/regu/XY"],
  ["ウッウロボ", "card/39668/regu/XY"],
  ["エネルギー回収", "card/43812/regu/XY"],
  ["クロススイッチャー", "card/40052/regu/XY"],
  ["スーパーエネルギー回収", "card/43029/regu/XY"],
  ["すごいつりざお", "card/43273/regu/XY"],
  ["すごいつりざお", "card/43273/regu/XY"],
  ["ネストボール", "card/43820/regu/XY"],
  ["ハイパーボール", "card/43821/regu/XY"],
  ["ハイパーボール", "card/43821/regu/XY"],
  ["バトルVIPパス", "card/40053/regu/XY"],
  ["ふしぎなアメ", "card/43822/regu/XY"],
  ["ポケモンいれかえ", "card/43824/regu/XY"],
  ["ミラージュゲート", "card/42402/regu/XY"],
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
    border: "thick ridge rgb(0, 99, 181, 0.8)",
    padding: "3px 5px",
    width: "400px",
  },
  title: {
    color: "rgb(255, 255, 255)",
    id: "name-container",
    innerStroke: "5px rgb(0, 99, 181)",
    outerStroke: "7px rgb(255, 255, 255)",
  },
  desc: {
    color: "rgb(255, 255, 255)",
    id: "desc-container",
    innerStroke: "3px rgb(0, 99, 181)",
    outerStroke: "6px rgb(255, 255, 255)",
  },
};

test("グッズ取得", async ({ page }) => {
  for (const [name, url] of items) {
    const { pathBox, pathSubtitle } = getOutputPaths(name);
    if ((await exists(pathSubtitle)) && (await exists(pathBox))) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator(".WrapperArea").evaluate(resetStyle);
    const parent = page.locator(".RightBox-inner");
    await parent.evaluate(createTitle, { id: "title", name });
    const titleHandle = await page
      .locator("#title")
      .evaluateHandle(renderStroke, theme.title);
    const descHandle = await page
      .locator('//h2[text()="グッズ"]/following-sibling::p[1]')
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
