
'use client'
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarButtonDragOverLay } from "./SidebarButton";
import { ElementsType, EditorElements } from "./EditorElements";
import useDesigner from "./hooks/useDesigner";

const DragOverlayWrapper = () => {
    const { elements } = useDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if(!draggedItem) return null;

    let node = <div>No drag overlay</div>
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

    if(isSidebarBtnElement){
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarButtonDragOverLay formElement={EditorElements[type]} />
    }

    const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
    if (isDesignerElement){
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((el) => el.id === elementId);
        if(!element) node = <div>Element not found</div>;
        else{
            const DesignerElementComponent = EditorElements[element.type].designerComponent;
            node = (
                <div className="flex bg-zinc-600 border rounded-md 
                h-[120px] w-fill py-2 px-4 opacity-80 pointer pointer-events-none">
                    <DesignerElementComponent elementInstance={element} />
                </div>
            );
        }
    }

    return <DragOverlay>{node}</DragOverlay>;
}
 
export default DragOverlayWrapper;