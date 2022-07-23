import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { Button } from 'ui';
import { Dialog } from '../components/fundamental/Dialog';
import { empty } from '../helper/function';

const DialogDesign: FC = () => {
  const [open1, setOpen1] = useState<boolean>(false);
  const dismiss1 = useCallback(() => setOpen1(false), []);

  const [open2, setOpen2] = useState<boolean>(false);
  const dismiss2 = useCallback(() => setOpen2(false), []);

  return (
    <div className="flex gap-1">
      <Button onClick={() => setOpen1(true)}>Open</Button>
      <Dialog title="hello" show={open1} dismiss={dismiss1}>
        world
      </Dialog>

      <Button onClick={() => setOpen2(true)}>Open</Button>
      <Dialog title="hello" onSubmit={empty} show={open2} dismiss={dismiss2}>
        hello
      </Dialog>
    </div>
  );
};

export default DialogDesign;
