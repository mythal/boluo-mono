import React, { useState } from 'react';
import { ColorPicker } from '../components/ColorPicker';

const ColorDesign: React.FC = () => {
  const [color, setColor] = useState('#000000');
  return (
    <div>
      <p>
        <a href="">react-colorful</a>
      </p>
      <div>
        <ColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
};

export default ColorDesign;
