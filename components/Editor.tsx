
'use client'
import clsx from "clsx";
import { useState } from "react";
import useDesigner from "./hooks/useDesigner";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { EditorElementInstance, EditorElements, ElementsType } from "./EditorElements";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const Editor = () => {
    const { selectedSize, elements, addElement, selectedElement, setSelectedElement, removeElement,
      isGrid, gap, cols, rows, direction, justify, align } = useDesigner();

    const droppable = useDroppable({
      id: "designer-drop-area",
      data: { isDesignerDropArea: true },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
          const { active, over } = event;
          if(!active || !over) return;
    
          const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
          const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;
    
          const droppingSidebarBtnOverDesignerDropArea = 
            isDesignerBtnElement && isDroppingOverDesignerDropArea
    
          // First scenario
          if(droppingSidebarBtnOverDesignerDropArea){
            const type = active.data?.current?.type;
            const newElement = EditorElements[type as ElementsType].construct( idGenerator() );
    
            addElement(elements.length, newElement);
            return;
          }
    
          const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
    
          const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;
    
          const isDroppingOverDesignerElement =
            isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
    
          const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;
    
          // Second scenario
          if (droppingSidebarBtnOverDesignerElement) {
            const type = active.data?.current?.type;
            const newElement = EditorElements[type as ElementsType].construct(idGenerator());
    
            const overId = over.data?.current?.elementId;
    
            const overElementIndex = elements.findIndex((el) => el.id === overId);
            if (overElementIndex === -1) {
              throw new Error("element not found");
            }
    
            let indexForNewElement = overElementIndex; // i assume i'm on top-half
            if (isDroppingOverDesignerElementBottomHalf) {
              indexForNewElement = overElementIndex + 1;
            }
    
            addElement(indexForNewElement, newElement);
            return;
          }
    
          // Third scenario
          const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
    
          const draggingDesignerElementOverAnotherDesignerElement =
            isDroppingOverDesignerElement && isDraggingDesignerElement;
    
          if (draggingDesignerElementOverAnotherDesignerElement) {
            const activeId = active.data?.current?.elementId;
            const overId = over.data?.current?.elementId;
    
            const activeElementIndex = elements.findIndex((el) => el.id === activeId);
    
            const overElementIndex = elements.findIndex((el) => el.id === overId);
    
            if (activeElementIndex === -1 || overElementIndex === -1) {
              throw new Error("element not found");
            }
    
            const activeElement = { ...elements[activeElementIndex] };
            removeElement(activeId);
    
            let indexForNewElement = overElementIndex; 
            if (isDroppingOverDesignerElementBottomHalf) {
              indexForNewElement = overElementIndex + 1;
            }
    
            addElement(indexForNewElement, activeElement);
          }
    
        },
    });

    const gridStyle = {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      gap: `${gap?.toString()}px`,
    }

    const flexStyle = {
      display: "flex",
      flexWrap: direction ? "wrap" : "wrap-reverse",
      justifyContent: justify ? justify : '',
      alignItems: align ? align : '',
      gap: `${gap?.toString()}px`,
    }

    return (
        <div 
          className='flex flex-grow items-center justify-center h-full w-full relative overflow-y-auto 
          bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] use-automation-zoom-in transition-all rounded-md'
        >

          <div 
            className={clsx(
              'p-4 h-full',
              {
              '!w-[850px]': selectedSize === 'Tablet',
              '!w-[420px]': selectedSize === 'Mobile',
              'w-full': selectedSize === 'Desktop',
              }
            )}
              
            onClick={() => {
              if(selectedElement) setSelectedElement(null);
            }}
          >

            <div 
              ref={droppable.setNodeRef}
              className={`h-full m-auto rounded-lg dark:bg-slate-700 bg-slate-300
                flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto
              ${droppable.isOver && "ring-4 ring-primary/20 ring-inset"}`}
            >
              {!droppable.isOver && elements.length === 0 && (
                <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                    Drop here
                </p>
              )}
                {droppable.isOver && elements.length === 0 && (
                  <div className="p-4 w-full">
                    <div className="h-[120px] rounded-md bg-primary/20"></div>
                  </div>
                )}
                {elements.length > 0 && (
                  <div className="text-background w-full grid grid-cols-2 grid-rows-2 gap-2 p-4"
                    style={{
                      display: isGrid ? "grid" : "flex",
                      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                      gap: `${gap?.toString()}px`,

                      flexWrap: direction ? "wrap" : "wrap-reverse",
                      justifyContent: justify ? justify : '',
                      alignItems: align ? align: '',
                    }}
                  >
                    {elements.map((element) => (
                      <DesignerElementWrapper key={element.id} element={element} />
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
    );
}
 
function DesignerElementWrapper({ element }: { element: EditorElementInstance }) {
    const { removeElement, selectedElement, setSelectedElement } = useDesigner();
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  
    const topHalf = useDroppable({
      id: element.id + "-top",
      data: {
        type: element.type,
        elementId: element.id,
        isTopHalfDesignerElement: true,
      },
    });
  
    const bottomHalf = useDroppable({
      id: element.id + "-bottom",
      data: {
        type: element.type,
        elementId: element.id,
        isBottomHalfDesignerElement: true,
      },
    });
  
    const draggable = useDraggable({
      id: element.id + "-drag-handler",
      data: {
        type: element.type,
        elementId: element.id,
        isDesignerElement: true,
      }
    });
  
    if(draggable.isDragging) return null;
  
    const DesignerElement = EditorElements[element.type].designerComponent;
  
    return (
      <div 
        ref={draggable.setNodeRef}
        {...draggable.listeners}
        {...draggable.attributes}
        className="relative h-[120px] flex flex-col text-foreground
          hover:cursor-pointer rounded-md ring-1 ring-zinc-400 dark:ring-zinc-600 ring-inset"
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className="absolute w-full h-1/2 rounded-t-md"
        />
  
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute w-full h-1/2 rounded-t-md"
        />
  
        {mouseIsOver && (
            <>
              <div className="absolute right-0 h-full">
                <Button 
                  className="flex justify-center h-full border 
                  rounded-md rounded-l-none bg-red-500"
                  onClick={(e) => { 
                    e.stopPropagation();
                    removeElement(element.id) 
                  }}
                >
                  <Trash className="h-6 w-6" />
                </Button>
              </div>
  
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 
                -translate-y-1/2 animate-pulse"
              >
                <p className="text-muted-foreground text-sm">
                  Click for properties or drag to move
                </p>
              </div>
            </>
          )
        }
  
        {topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
        )}
  
        <div 
          className={
          `flex w-full h-[120px] items-center rounded-md bg-zinc-200/40 
          dark:bg-zinc-600/40 px-4 py-2 pointer-events-none opacity-100 
          ${mouseIsOver && "opacity-30"} 
          ${topHalf.isOver && "border-t-4 border-t-foreground"}
          ${bottomHalf.isOver && "border-b-4 border-b-foreground"}`}
        >
          <DesignerElement elementInstance={element} />
        </div>
  
        {bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
        )}
      </div>
    );
  }

export default Editor;