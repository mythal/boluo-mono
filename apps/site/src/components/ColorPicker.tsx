import type { FC } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

interface Props {
  color: string;
  onChange: (newColor: string) => void;
}

export const ColorPicker: FC<Props> = ({ color, onChange }) => (
  <>
    <HexColorPicker color={color} onChange={onChange} />
    <HexColorInput color={color} onChange={onChange} />
  </>
);
