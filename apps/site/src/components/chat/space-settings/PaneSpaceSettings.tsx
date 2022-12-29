import type { EditSpace, Space } from 'boluo-api';
import { Settings } from 'boluo-icons';
import type { FC } from 'react';
import { FormProvider, useController, useForm, useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import type { MutationFetcher } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';
import { Button, HelpText, Spinner, TextArea, TextInput } from 'ui';
import type { ChildrenProps } from 'ui/types';
import { post } from '../../../api/browser';
import { useSpace } from '../../../hooks/useSpace';
import { useClosePane } from '../../../state/panes';
import { DiceSelect } from '../../DiceSelect';
import { ClosePaneButton } from '../ClosePaneButton';
import { PaneBodyBox } from '../PaneBodyBox';
import { PaneHeaderBox } from '../PaneHeaderBox';

interface Props {
  spaceId: string;
}

type FormSchema = {
  spaceId: string;
  name: string;
  description: string;
  explorable: boolean;
  publicity: string;
  allowSpectator: boolean;
  defaultDiceType: string;
};

const SectionTitle: FC<ChildrenProps> = ({ children }) => <h3 className="font-bold">{children}</h3>;

const NameField: FC = () => {
  const { register } = useFormContext<FormSchema>();
  return (
    <label className="flex flex-col">
      <div className="py-1">
        <FormattedMessage defaultMessage="Space Name" />
      </div>
      <TextInput {...register('name')} />
    </label>
  );
};

const DescriptionField: FC = () => {
  const { register } = useFormContext<FormSchema>();
  return (
    <label className="flex flex-col">
      <div className="py-1">
        <FormattedMessage defaultMessage="Space Description" />
      </div>
      <TextArea {...register('description')} />
    </label>
  );
};

const PublicityField: FC = () => {
  const { register } = useFormContext<FormSchema>();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label>
          <input type="radio" value="public" {...register('publicity')} className="mr-2" />
          <FormattedMessage defaultMessage="Public" />
          <HelpText>
            <FormattedMessage defaultMessage="Everyone can join this space" />
          </HelpText>
        </label>

        <label>
          <input type="radio" value="private" {...register('publicity')} className="mr-2" />
          <FormattedMessage defaultMessage="Private" />

          <HelpText>
            <FormattedMessage defaultMessage="Only invited people can join this space" />
          </HelpText>
        </label>
      </div>
    </div>
  );
};

const FieldAllowSpectator: FC = () => {
  const { register } = useFormContext<FormSchema>();
  return (
    <div>
      <label>
        <div>
          <input type="checkbox" className="mr-2" {...register('allowSpectator')} />
          <FormattedMessage defaultMessage="Allow Spectator" />
        </div>
        <HelpText>
          <FormattedMessage defaultMessage="Whether to allow everyone on the Internet to view this space" />
        </HelpText>
      </label>
    </div>
  );
};

const FieldDefaultDice: FC = () => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<FormSchema, 'defaultDiceType'>({
    name: 'defaultDiceType',
    defaultValue: 'd20',
  });
  return (
    <div>
      <label>
        <div className="py-1">
          <FormattedMessage defaultMessage="Default dice" />
        </div>
        <DiceSelect value={value} onChange={onChange} />
      </label>
    </div>
  );
};

const updater: MutationFetcher<Space, EditSpace, [string, string]> = async (_, { arg }) => {
  const result = await post('/spaces/edit', arg);
  const space = result.unwrap();
  return space;
};

const spaceToForm = (space: Space): FormSchema => ({
  spaceId: space.id,
  name: space.name,
  description: space.description,
  defaultDiceType: space.defaultDiceType,
  explorable: space.explorable,
  publicity: space.isPublic ? 'public' : 'private',
  allowSpectator: space.allowSpectator,
});

export const PaneSpaceSettings: FC<Props> = ({ spaceId }) => {
  const close = useClosePane();
  const space = useSpace(spaceId);
  const { trigger: editSpace, isMutating } = useSWRMutation(
    ['/spaces/query', spaceId],
    updater,
    {
      populateCache: (space: Space) => {
        console.log(space);
        return space;
      },
      revalidate: false,
    },
  );
  const form = useForm<FormSchema>({
    defaultValues: spaceToForm(space),
  });
  const onSubmit = async ({ publicity, ...rest }: FormSchema): Promise<void> => {
    const isPublic = publicity === 'public';
    const space = await editSpace({ isPublic, ...rest, grantAdmins: [], removeAdmins: [] });
    if (space) {
      form.reset(spaceToForm(space));
    }
  };
  return (
    <>
      <PaneHeaderBox operators={<ClosePaneButton />} icon={<Settings />}>
        <FormattedMessage
          defaultMessage="Settings of &quot;{spaceName}&quot; Space"
          values={{ spaceName: space.name }}
        />
      </PaneHeaderBox>
      <PaneBodyBox className="relative border-r overflow-x-hidden overflow-y-auto ">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-4 flex flex-col gap-6 h-full">
              <div>
                <SectionTitle>
                  <FormattedMessage defaultMessage="Basic" />
                </SectionTitle>
                <NameField />
                <FieldDefaultDice />
                <DescriptionField />
              </div>
              <div className="flex flex-col gap-2">
                <SectionTitle>
                  <FormattedMessage defaultMessage="Space Publicity" />
                </SectionTitle>
                <PublicityField />
                <FieldAllowSpectator />
              </div>
            </div>
            <div className="p-4 sticky bottom-0 border-t bg-bg flex justify-end gap-2">
              {isMutating && <Spinner />}
              <Button type="button" onClick={close}>
                <FormattedMessage defaultMessage="Cancel" />
              </Button>

              <Button type="submit" data-type="primary" disabled={isMutating || !form.formState.isDirty}>
                <FormattedMessage defaultMessage="Change Settings" />
              </Button>
            </div>
          </form>
        </FormProvider>
      </PaneBodyBox>
    </>
  );
};
