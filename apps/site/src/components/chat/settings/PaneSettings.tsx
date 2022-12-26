import { Settings } from 'boluo-icons';
import type { FC } from 'react';
import { useId } from 'react';
import { FormattedMessage } from 'react-intl';
import { Kbd } from 'ui/Kbd';
import { useSettings } from '../../../hooks/useSettings';
import { useFocusPane } from '../../../state/panes';
import { ClosePaneButton } from '../ClosePaneButton';
import { PaneHeaderBox } from '../PaneHeaderBox';
import { EnterSendSwitch } from './EnterSendSwitch';
import { ExpandDiceSwitch } from './ExpandDiceSwitch';
import { LocaleSelect } from './LocaleSelect';
import { SchemeSelect } from './SchemeSelect';

const LanguageField = () => {
  const id = useId();
  return (
    <div>
      <label className="block py-1" htmlFor={id}>
        <FormattedMessage defaultMessage="Language" />
      </label>
      <LocaleSelect id={id} />
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
      <SchemeSelect id={id} />
    </div>
  );
};

const ExpandDiceField = () => {
  return (
    <label className="flex items-center gap-4 select-none">
      <ExpandDiceSwitch />
      <FormattedMessage defaultMessage="Expand dice in the messages" />
    </label>
  );
};

const EneterSendField = () => {
  const { enterSend = false } = useSettings();
  return (
    <label className="flex items-center gap-4 select-none">
      <EnterSendSwitch />
      <div className="flex flex-col gap-1.5">
        <div>
          <FormattedMessage
            defaultMessage="Use the {enter} key to send messages"
            values={{ enter: <Kbd>Enter</Kbd> }}
          />
        </div>
        <div className="text-neutral-500 text-sm">
          {enterSend
            ? (
              <FormattedMessage
                defaultMessage="Tip: Use {key} to make a line break."
                values={{
                  key: (
                    <>
                      <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd>
                    </>
                  ),
                }}
              />
            )
            : (
              <FormattedMessage
                defaultMessage="Tip: Use {key} to send messages."
                values={{
                  key: (
                    <>
                      <Kbd>Ctrl</Kbd>/<Kbd>⌘</Kbd> + <Kbd>Enter</Kbd>
                    </>
                  ),
                }}
              />
            )}
        </div>
      </div>
    </label>
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
      <div className="row-span-2 flex p-4 flex-col gap-6" onClick={focus}>
        <LanguageField />
        <SchemeField />
        <ExpandDiceField />
        <EneterSendField />
      </div>
    </>
  );
};
