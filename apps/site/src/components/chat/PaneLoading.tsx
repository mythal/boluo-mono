import { Loading } from 'ui';

export const PaneLoading = () => {
  return (
    <>
      <div className="border-b" />
      <div className="flex items-center justify-center text-surface-400">
        <Loading />
      </div>
      <div />
    </>
  );
};
