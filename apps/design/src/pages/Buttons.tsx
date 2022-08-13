import { Fairy } from 'boluo-icons';
import { useAtom } from 'jotai';
import { FC, useState } from 'react';
import { Button, Icon, Label, RefreshButton, Spinner, Switch } from 'ui';
import { disabledAtom, smallAtom } from '../atoms';
export const Buttons: FC = () => {
  const [disabled, setDisabled] = useAtom(disabledAtom);
  const [small, setSmall] = useAtom(smallAtom);
  const [icon, setIcon] = useState(false);
  return (
    <div>
      <div className="flex gap-4">
        <Label className="inline-flex gap-4 items-center">
          Disable?
          <Switch checked={disabled} onChange={setDisabled} />
        </Label>

        <Label className="inline-flex gap-4 items-center">
          Small?
          <Switch checked={small} onChange={setSmall} />
        </Label>

        <Label className="inline-flex gap-4 items-center">
          Icon?
          <Switch checked={icon} onChange={setIcon} />
        </Label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mt-4">
          <Button disabled={disabled} data-small={small}>{icon && <Icon icon={Fairy} />}Button</Button>
        </div>
        <div>
          <Button disabled={disabled} data-small={small} data-type="primary">
            {icon && <Spinner />}Primary
          </Button>
        </div>
        <div>
          <RefreshButton />
        </div>
      </div>
    </div>
  );
};
Buttons.displayName = 'Buttons';
