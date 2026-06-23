"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Sürükle-bırak ile sıralanabilen fotoğraf ızgarası.
 * İlk görsel "vitrin" (kapak) olarak işaretlenir — sahibinden tarzı.
 */
export default function SortableImages({
  images,
  onReorder,
  onRemove,
  children,
}: {
  images: string[];
  onReorder: (next: string[]) => void;
  onRemove: (index: number) => void;
  /** "+" ekleme butonu gibi sona eklenecek içerik. */
  children?: React.ReactNode;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = images.indexOf(String(active.id));
    const to = images.indexOf(String(over.id));
    if (from < 0 || to < 0) return;
    onReorder(arrayMove(images, from, to));
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <SortableTile key={img} id={img} src={img} cover={i === 0} onRemove={() => onRemove(i)} />
          ))}
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function SortableTile({
  id,
  src,
  cover,
  onRemove,
}: {
  id: string;
  src: string;
  cover: boolean;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      {/* sürükleme alanı (görselin kendisi) */}
      <div {...attributes} {...listeners} className="h-full w-full cursor-grab active:cursor-grabbing">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
      >
        ✕
      </button>
      {cover && (
        <span className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-center text-[10px] font-bold text-gray-900">
          Vitrin
        </span>
      )}
    </div>
  );
}
