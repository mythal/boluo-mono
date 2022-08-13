import { FC } from 'react';
import { Oops } from 'ui';

export const ErrorHanding: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl mb-2">Inline</h2>
        <Oops error={null} type={'inline'} />
      </div>

      <div>
        <h2 className="text-xl mb-2">Inline small</h2>
        <Oops error={null} type="inline-small" />
      </div>

      <div>
        <h2 className="text-xl mb-2">Block</h2>
        <div className="w-full h-32">
          <Oops error={null} type="block" />
        </div>
      </div>
    </div>
  );
};
ErrorHanding.displayName = 'Errors';
