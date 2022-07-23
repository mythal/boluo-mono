import React from 'react';
import { icons } from '../../icons/icons';

interface Props {
  icon: keyof typeof icons;
  className?: string;
  noStrut?: boolean;
  label?: string | undefined;
}

const Icon: React.FC<Props> = ({ icon, noStrut = false, className, label }: Props) => {
  const DynamicIcon = icons[icon];
  const loaded = (
    <DynamicIcon aria-hidden role="img" width="1em" height="1em" className={className} aria-label={label} />
  );
  if (noStrut) {
    return loaded;
  } else {
    return <span className="inline-flex items-center before:content-['\200b']">{loaded}</span>;
  }
};
Icon.displayName = 'Icon';
export default React.memo(Icon);
