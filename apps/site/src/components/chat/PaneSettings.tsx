import { Settings } from 'boluo-icons';
import type { FC } from 'react';
import { useId } from 'react';
import { FormattedMessage } from 'react-intl';
import { useFocusPane } from '../../state/panes';
import { LocaleSwitch } from '../LocaleSwitch';
import { SchemeSwitch } from '../SchemeSwitch';
import { ClosePaneButton } from './ClosePaneButton';
import { PaneHeaderBox } from './PaneHeaderBox';

const LanguageField = () => {
  const id = useId();
  return (
    <div>
      <label className="block py-1" htmlFor={id}>
        <FormattedMessage defaultMessage="Language" />
      </label>
      <LocaleSwitch id={id} />
    </div>
  );
};

const SchemeField = () => {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block py-1">
        <FormattedMessage defaultMessage="Scheme" />
      </label>
      <SchemeSwitch id={id} />
    </div>
  );
};

export const PaneSettings: FC = () => {
  const focus = useFocusPane();
  return (
    <>
      <PaneHeaderBox operators={<ClosePaneButton />}>
        <Settings />
        <FormattedMessage defaultMessage="Settings" />
      </PaneHeaderBox>
      <div className="row-span-2 flex p-4 flex-col gap-4" onClick={focus}>
        <LanguageField />
        <SchemeField />
      </div>
    </>
  );
};
