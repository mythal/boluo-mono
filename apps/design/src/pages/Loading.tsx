import { FC } from 'react';
import { Loading } from 'ui';

const Page: FC = () => {
  return (
    <div>
      <div className="h-32">
        <Loading />
      </div>
      <div>
        <Loading type="inline" />
      </div>
    </div>
  );
};

Page.displayName = 'Loading';

export default Page;
