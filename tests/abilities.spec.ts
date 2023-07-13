import { test } from "@playwright/test";
import {
  type Theme,
  addPrefix,
  baseUrl,
  exists,
  getOutputPaths,
  renderStroke,
  renderSubtitle,
  renderWithImage,
  resetStyle,
} from "./helpers";

const abilities = [
  ["イキリテイク", "card/43272/regu/XY"],
  ["かくしふだ", "card/41212/regu/XY"],
  ["きょくていおん", "card/43234/regu/XY"],
  ["しっこくのわざわい", "card/43164/regu/XY"],
  ["ねっけつレッスン", "card/42283/regu/XY"],
  ["はたらくまえば", "card/40984/regu/XY"],
  ["はなえらび", "card/41853/regu/XY"],
  ["ルミナスサイン", "card/42794/regu/XY"],
  ["わななくれいき", "card/43235/regu/XY"],
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
    border: "thick ridge rgb(208, 0, 14, 0.8)",
    padding: "3px 5px",
    width: "400px",
  },
  title: {
    color: "rgb(255, 255, 255)",
    id: "name-container",
    innerStroke: "5px rgb(208, 0, 14)",
    outerStroke: "7px rgb(255, 255, 255)",
  },
  desc: {
    color: "rgb(255, 255, 255)",
    id: "desc-container",
    innerStroke: "3px rgb(208, 0, 14)",
    outerStroke: "6px rgb(255, 255, 255)",
  },
};

test("特性取得", async ({ page }) => {
  for (const [name, url] of abilities) {
    const { pathBox, pathSubtitle } = getOutputPaths(name);
    if ((await exists(pathSubtitle)) && (await exists(pathBox))) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator(".WrapperArea").evaluate(resetStyle);

    const title = page.locator('//h2[text()="特性"]/following-sibling::h4[1]');
    await title.evaluate(addPrefix, { prefix: "特性：" });
    const titleHandle = await title.evaluateHandle(renderStroke, theme.title);
    const descHandle = await page
      .locator('//h2[text()="特性"]/following-sibling::p[1]')
      .evaluateHandle(renderStroke, theme.desc);
    const parent = page.locator(".RightBox-inner");
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
