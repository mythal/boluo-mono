import { useState } from 'react';
import { TextArea, TextInput } from 'ui';
import type { SelectItem } from '../components/fundamental/Select';
import { Select } from '../components/fundamental/Select';

const FormDesign = () => {
  const selectItems = [
    { label: 'Hello, world', value: 'en' },
    { label: '你好，世界', value: 'zh' },
    { label: 'こんにちは、世界', value: 'ja' },
  ];
  const [selected, setSelected] = useState<SelectItem['value']>('ja');

  return (
    <div>
      <div className="my-2 flex gap-2">
        <TextInput placeholder="Default" />
        <TextInput placeholder="Error" data-state="error" />
        <TextInput placeholder="Warning" data-state="warning" />
      </div>
      <div className="my-2 flex gap-2">
        <TextInput disabled placeholder="Default" />
        <TextInput disabled placeholder="Error" data-state="error" />
        <TextInput disabled placeholder="Warning" data-state="warning" />
      </div>
      <div>
        <TextArea />
      </div>
      <div className="mt-2">
        <div className="flex w-[16rem] flex-col gap-2">
          <Select items={selectItems} value={selected} onChange={setSelected} />
          <Select items={selectItems} value={selected} onChange={setSelected} />
          <Select items={selectItems} value={selected} onChange={setSelected} disabled />
        </div>
      </div>
    </div>
  );
};

export default FormDesign;
