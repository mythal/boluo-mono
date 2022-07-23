import { useState } from 'react';
import clsx from 'clsx';
import Oops from '../components/Oops';

const ErrorHandlingDesign = () => {
  const [resize, setResize] = useState(true);
  return (
    <div>
      <p>
        <label>
          resize <input type="checkbox" onChange={(e) => setResize(e.target.checked)} checked={resize} />
        </label>
      </p>
      <div className={clsx(resize && 'resize overflow-scroll', 'h-[50vh] w-[50vw] border')}>
        <Oops error={'Something'} />
      </div>
    </div>
  );
};

export default ErrorHandlingDesign;
