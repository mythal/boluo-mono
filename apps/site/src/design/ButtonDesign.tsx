import type { FC } from 'react';
import { Button } from 'ui';
import Icon from '../components/fundamental/Icon';
import { SpinnerIcon } from '../components/SpinnerIcon';

const ButtonDesign: FC = () => {
  return (
    <div>
      <div className="my-2 flex gap-2">
        <Button>Button</Button>
        <Button data-icon>
          <Icon icon="fairy" />
        </Button>
        <Button>
          <Icon icon="dice-twenty-faces-twenty" /> With text
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="my-2 flex gap-2">
        <Button data-small>small</Button>
        <Button data-small>
          <Icon icon="archive" /> small
        </Button>
        <Button data-small>
          <SpinnerIcon /> small
        </Button>
      </div>
      <div className="my-2 flex gap-2">
        <Button data-type="primary">Primary</Button>
        <Button disabled data-type="primary">
          Disabled
        </Button>
      </div>
    </div>
  );
};

export default ButtonDesign;
