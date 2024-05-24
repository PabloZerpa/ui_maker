
'use client'
import { LaptopMinimal, Smartphone, Tablet } from "lucide-react";
import { Input } from "./ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import useDesigner from "./hooks/useDesigner";
import PreviewButton from "./PreviewButton";
import CodeBlocks from "./CodeBlocks";

const EditorNavigation = () => {
    const { changeSize } = useDesigner();
    return (
        <nav className="border-b-2 border-solid border-slate-400 dark:border-slate-200 w-full h-14 px-4 py-4 flex justify-between items-center bg-slate-200 dark:bg-slate-800">
            <TooltipProvider>
                <Input 
                    type="text" 
                    placeholder="Title" 
                    className="bg-slate-300 dark:bg-slate-500 border-none outline-none w-32 sm:w-48 h-8 m-0 p-2 text-lg rounded"
                />

                <div className="flex gap-8">

                    <div className="flex gap-6 pt-2" >
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div onClick={() => changeSize('Desktop')} className="hover:text-blue-600 cursor-pointer">
                                    <LaptopMinimal />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black">
                                <p>Desktop</p>
                            </TooltipContent> 
                        </Tooltip>

                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div onClick={() => changeSize('Tablet')} className="hover:text-blue-600 cursor-pointer">
                                    <Tablet />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black">
                                <p>Tablet</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div onClick={() => changeSize('Mobile')} className="hover:text-blue-600 cursor-pointer">
                                    <Smartphone />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black">
                                <p>Mobile</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    
                </div>

                <div className="flex gap-4">
                    <PreviewButton />
                    <CodeBlocks />
                </div>
            </TooltipProvider>
        </nav>
    );
}
 
export default EditorNavigation;