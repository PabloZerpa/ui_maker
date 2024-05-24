
'use client'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import Editor from "./Editor";
import EditorNavigation from "./EditorNavigation";
import DragOverlayWrapper from "./DragOverlayWrapper";
import SettingsSidebar from "./SettingsSidebar";
import ComponentSidebar from "./ComponentsSidebar";

const Builder = () => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10,
        },
      });
      
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
          delay: 300,
          tolerance: 5,
        },
    });
    
    const sensors = useSensors(mouseSensor, touchSensor);
    // pr-[385px]
    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full relative">
                <EditorNavigation />

                <div className="flex flex-col sm:flex-row w-full h-[85vh]">
                    <ComponentSidebar />
                    <Editor />
                    <SettingsSidebar />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
} 
 
export default Builder;