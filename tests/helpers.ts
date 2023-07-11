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
