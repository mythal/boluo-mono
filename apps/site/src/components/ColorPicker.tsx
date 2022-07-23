import { HexColorInput, HexColorPicker } from 'react-colorful';
import type { FC } from 'react';

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
