import React, { useId } from 'react';
import { useSelect } from 'downshift';
import { useTransition } from 'transition-hook';
import clsx from 'clsx';
import type { StyleProps } from '../../helper/props';
import Icon from './Icon';

export interface SelectItem {
  label: string;
  value: string;
}

interface Props extends StyleProps {
  items: SelectItem[];
  value: SelectItem['value'];
  onChange: (newSelectedItem: SelectItem['value']) => void;
  label?: string;
  disabled?: boolean;
}

export const Select: React.FC<Props> = ({ items, value, onChange, label, className, disabled = false }) => {
  const id = useId();
  function itemToString(item: SelectItem | null) {
    return item ? item.value : '';
  }
  const selectedItem = items.find((item) => item.value === value) ?? null;
  const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
    items,
    itemToString,
    selectedItem,
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onChange(selectedItem.value);
      }
    },
  });
  const transitionTimeMs = 60;
  const { stage } = useTransition(isOpen, transitionTimeMs);

  return (
    <div className={clsx('relative', className)}>
      <div>
        {label && (
          <label className="block" {...getLabelProps()}>
            {label}
          </label>
        )}
        <button
          className={clsx(
            'flex w-full justify-between gap-1 p-2',
            'cursor-pointer rounded shadow-1/2 shadow-gray-200',
            'disabled:cursor-not-allowed',
            'border-1/2 border-select-button-border bg-select-button-bg text-select-button-text',
            'disabled:bg-select-button-disabled disabled:text-select-button-disabledText',
            'hover-enabled:border-select-button-hoverBorder hover-enabled:bg-select-button-hover',
            isOpen && 'border-select-button-openBorder bg-select-button-open'
          )}
          aria-label="toggle menu"
          type="button"
          {...getToggleButtonProps()}
          data-open={isOpen}
          disabled={disabled}
          aria-disabled={disabled}
        >
          <span>{selectedItem?.label}</span>
          <span>
            <Icon icon="chevrons-up" className={clsx(isOpen || 'rotate-180', 'duration-150300 transition-transform')} />
          </span>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        data-open={isOpen}
        data-stage={stage}
        aria-hidden={!isOpen}
        className={clsx(
          'absolute z-10 m-0 mt-1 w-full select-none list-none rounded border p-0',
          'origin-top scale-y-0 transition-all duration-75',
          'border border-select-list-border text-select-list-text shadow-menu',
          stage === 'enter' && 'scale-y-100'
        )}
      >
        {items.map((item, index) => {
          const highlighted = index === highlightedIndex;
          const selected = selectedItem?.value === item.value;
          return (
            <li
              key={item.value}
              {...getItemProps({ item, index })}
              className={clsx(
                'cursor-pointer px-4 py-3',
                'first-of-type:rounded-t last-of-type:rounded-b',
                !highlighted && !selected && ['bg-select-item-bg text-select-item-text'],
                'hover:bg-select-item-hover',
                highlighted && !selected && 'bg-select-item-highlighted',
                selected && [
                  'text-white hover:bg-select-item-selectedHover',
                  highlighted ? 'bg-select-item-selectedHighlighted' : 'bg-select-item-selected',
                ]
              )}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
