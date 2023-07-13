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

const tools = [
  ["おはらいグローブ", "card/40291/regu/XY"],
  ["こだわりベルト", "card/42792/regu/XY"],
  ["災いの箱", "card/41585/regu/XY"],
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
    border: "thick ridge rgb(112, 78, 155, 0.8)",
    padding: "3px 5px",
    width: "400px",
  },
  title: {
    color: "rgb(255, 255, 255)",
    id: "name-container",
    innerStroke: "5px rgb(112, 78, 155)",
    outerStroke: "7px rgb(255, 255, 255)",
  },
  desc: {
    color: "rgb(255, 255, 255)",
    id: "desc-container",
    innerStroke: "3px rgb(112, 78, 155)",
    outerStroke: "6px rgb(255, 255, 255)",
  },
};

test("ポケモンのどうぐ取得", async ({ page }) => {
  for (const [name, url] of tools) {
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
      .locator('//h2[text()="ポケモンのどうぐ"]/following-sibling::p[1]')
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
