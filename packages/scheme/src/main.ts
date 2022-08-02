import fs from 'fs';
import { argbFromHex, themeFromSourceColor, hexFromArgb } from '@material/material-color-utilities';

const theme = themeFromSourceColor(argbFromHex('#f82506'), [
  {
    name: 'custom-1',
    value: argbFromHex('#ff0000'),
    blend: true,
  },
]);
const light = theme.schemes.light.toJSON();
const dark = theme.schemes.dark.toJSON();
export type SchemeData = typeof light;
export type HexScheme = Record<keyof SchemeData, string>;

export const hexScheme = (scheme: SchemeData): HexScheme => {
  const entries = Object.entries(scheme).map(([key, value]) => [key, hexFromArgb(value)]);
  return Object.fromEntries(entries);
};

fs.writeFileSync('./light.json', JSON.stringify(hexScheme(light), null, 2));
fs.writeFileSync('./dark.json', JSON.stringify(hexScheme(dark), null, 2));
