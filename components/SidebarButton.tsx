'use client'
import React from "react";
import { Button } from "./ui/button";
import { EditorElement } from "./EditorElements";
import { useDraggable } from "@dnd-kit/core";

function SidebarButton({ formElement }: { formElement: EditorElement }) {
  const { label, icon: Icon } = formElement.designerBtnElement;

  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
      data: {
          type: formElement.type,
          isDesignerBtnElement: true,
      },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      id={label}
      variant={"outline"}
      className={`flex flex-col dark:text-slate-400 text-slate-900 dark:bg-slate-900 bg-slate-300 hover:bg-slate-400 dark:hover:bg-slate-800 gap-[1px] h-[60px] w-[60px] mb-2 cursor-grab rounded ${draggable.isDragging && "ring-2 ring-blue-600"}`}
    >
      <Icon className="h-24 w-24 text-blue-500 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarButtonDragOverLay ({ formElement }: { formElement: EditorElement }) {
  const { label, icon:Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
      id: `designer-btn-${formElement.type}`,
      data: {
          type: formElement.type,
          isDesignerBtnElement: true,
      },
  })
  return (
      <Button
          ref={draggable.setNodeRef}
          className="flex flex-col dark:text-slate-400 text-slate-900 dark:bg-slate-900 bg-slate-300 hover:bg-slate-400 dark:hover:bg-slate-800 gap-[1px] h-[60px] w-[60px] mb-2 cursor-grab rounded"
      >
          <Icon className="h-24 w-24 text-blue-600 cursor-grap" />
          <p className="text-xs">{label}</p>
      </Button>
  );
}

export default SidebarButton;