import React, { forwardRef, useState, useId } from 'react';
import type { DragEndEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

interface SortableItemProps {
  id: UniqueIdentifier;
}
const item = clsx(
  'text-text w-full p-4 cursor-move bg-design-sortItem border border-transprent hover:border-design-sortItemBorder'
);

function SortableItem({ id }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition!,
  };

  return (
    <div
      ref={setNodeRef}
      data-dragging={isDragging}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(item, isDragging && 'opacity-40')}
    >
      {id}
    </div>
  );
}
export const Item = forwardRef<HTMLDivElement, { id: UniqueIdentifier }>(({ id, ...props }, ref) => {
  return (
    <div {...props} className={clsx(item)} ref={ref}>
      {id}
    </div>
  );
});
Item.displayName = 'SortableItemOverlay';

export function SortableDesign() {
  const id = useId();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState<UniqueIdentifier[]>(['1', '2', '3']);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
      <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over!.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over!.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }
}

export default SortableDesign;
