import type { FC } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { Loading } from '../components/Loading';

export const LoadingDesign: FC = () => {
  const [resize, setResize] = useState(true);
  return (
    <div>
      <p>
        <label>
          resize <input type="checkbox" checked={resize} onChange={(e) => setResize(e.target.checked)} />
        </label>
      </p>
      <div className={clsx('h-[20em] w-[20em]', resize && 'resize overflow-scroll')}>
        <Loading />
      </div>
    </div>
  );
};

export default LoadingDesign;
