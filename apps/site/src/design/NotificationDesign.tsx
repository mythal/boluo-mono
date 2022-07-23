import { useState } from 'react';
import { Toast } from '../components/fundamental/Toast';
import { empty } from '../helper/function';
import { Button } from 'ui';
import { useNotify } from '../state/user-interface';

const NotificationDesign = () => {
  const [open, setOpen] = useState(true);
  const notify = useNotify();

  return (
    <div>
      <h2>Static toasts</h2>
      <div className="my-4 flex items-start gap-4">
        <Toast>Hello, world</Toast>
        {open && <Toast onClose={() => setOpen(false)}>I can be closed</Toast>}
        <Toast onClose={() => console.log('on close')} timeout={10000}>
          UwU
        </Toast>
      </div>
      <div className="my-4 flex items-start gap-4">
        <Toast level="default">Default</Toast>
        <Toast level="error" onClose={empty}>
          Error
        </Toast>
        <Toast level="warn" onClose={empty}>
          Warning
        </Toast>
      </div>

      <h2>Notifications</h2>
      <div className="my-4 flex items-start gap-4">
        <Button
          onClick={() => {
            notify(`hello, world ${String(new Date())}`);
          }}
        >
          Show
        </Button>

        <Button
          onClick={() => {
            notify(`warning!! ${String(new Date())}`, 'warn');
          }}
        >
          Show warning
        </Button>

        <Button
          onClick={() => {
            notify(`error!!! ${String(new Date())}`, 'error');
          }}
        >
          Show error
        </Button>
      </div>
    </div>
  );
};

export default NotificationDesign;
