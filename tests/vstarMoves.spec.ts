import { test } from '@playwright/test';
import {
  type Theme,
  baseUrl,
  exists,
  getOutputPaths,
  renderStroke,
  renderSubtitle,
  renderWithImage,
  resetStyle,
} from './helpers';

const vstarMoves = [
  ['スターレクイエム', 'card/41885/regu/XY'],
];

const theme: Theme = {
  withImage: {
    borderRadius: '12px',
    id: 'with-image',
    imageWidth: 200,
    marginRight: '-100px',
    width: '600px',
  },
  subtitle: {
    id: 'subtitle',
    background: 'rgb(50, 50, 50, 0.6)',
    border: '10px ridge rgb(255, 249, 151, 0.8)',
    padding: '3px 5px',
    width: '400px',
  },
  title: {
    color: 'rgb(255, 255, 255)',
    id: 'name-container',
    innerStroke: '5px rgb(50, 50, 50)',
    outerStroke: '7px rgb(255, 255, 255)',
  },
  desc: {
    color: 'rgb(255, 255, 255)',
    id: 'desc-container',
    innerStroke: '3px rgb(50, 50, 50)',
    outerStroke: '6px rgb(255, 255, 255)',
  },
};

test('VSTARパワーのワザ取得', async ({ page }) => {
  for (const [name, url] of vstarMoves) {
    const { pathBox, pathSubtitle } = getOutputPaths(name);
    if (await exists(pathSubtitle) && await exists(pathBox)) continue;
    await page.goto(`${baseUrl}/${url}`);
    await page.locator('.WrapperArea').evaluate(resetStyle);

    const titleHandle = await page.locator('//h2[text()="VSTARパワー"]/following-sibling::h4[2]').evaluateHandle(renderStroke, theme.title);
    const descHandle = await page.locator('//h2[text()="VSTARパワー"]/following-sibling::p[1]').evaluateHandle(renderStroke, theme.desc);
    const parent = page.locator('.RightBox-inner');
    const subtitleHandle = await parent.evaluateHandle(renderSubtitle, { ...theme.subtitle, titleElem: titleHandle, descElem: descHandle });
    const imageHandle = await page.locator('.LeftBox > img:first-child').evaluateHandle(e => e);
    await page.locator(`#${theme.subtitle.id}`).screenshot({ path: pathSubtitle, omitBackground: true });
    await parent.evaluate(renderWithImage, { ...theme.withImage, imageElem: imageHandle, subtitleElem: subtitleHandle });
    await page.locator(`#${theme.withImage.id}`).screenshot({ path: pathBox, omitBackground: true });
  }
});
