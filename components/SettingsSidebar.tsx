
'use client'
import useDesigner from './hooks/useDesigner'
import { useState } from 'react'
import { EditorElements } from "./EditorElements";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SettingsSidebar = () => {

    const { selectedElement, setSelectedElement, changeCols, changeRows, changeDirection, 
        changeJustify, changeAlign, changeGap, changeIsGrid, gap, isGrid, direction } = useDesigner();
  
      const [fields, setFields] = useState({
        label: '',
        placeHolder: '',
        helperText: '',
        color: '#E0E0E0',
        bg: '#191E24',
        variant: '',
        required: false,
        width: "300",
        height: "40",
        font: "12",
        weight: "normal",
        paddingTop: "0",
        paddingBot: "0",
        paddingLeft: "8",
        paddingRight: "0",
        marginTop: "0",
        marginBot: "0",
        marginLeft: "0",
        marginRight: "0",
    });
    
    const labels = ['Justify','Align'];

    function handleChanges(e: React.ChangeEvent<HTMLInputElement>){

      if(e.target.name === "required"){
          setFields({
              ...fields,
             "required": !fields.required,
          });
      }
      else{
          setFields({
              ...fields,
              [e.target.name]: e.target.value,
          });
      }
    }

    if(!selectedElement){
        return(
            <div className='h-32 sm:h-full w-full sm:w-[340px] border-t-2 sm:border-l-2 sm:border-t-0 py-4 border-solid border-slate-400 dark:border-slate-200 bg-slate-100 dark:bg-slate-800 overflow-x-hidden overflow-y-auto'>
                <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col px-4 space-y-3">

                    <h3 className="text-xl font-bold">Settings</h3>
        
                    <div className='flex gap-4'>
                        <input type="checkbox" name="isGrid" id="display" className='hidden' onChange={() => changeIsGrid(!isGrid)} />
                        <label htmlFor="display" className="cursor-pointer">
                            <span className={`${isGrid ? 'bg-blue-600 border-blue-600 border-[1px]' : 'bg-transparent border-slate-100 border-[1px]'} p-[4px] w-16 h-8 rounded-tl rounded-bl`}>Grid</span>
                            <span className={`${isGrid ? 'bg-transparent border-slate-100 border-[1px]' : 'bg-blue-600 border-blue-600 border-[1px]'} p-[4px] w-16 h-8 rounded-tr rounded-br`}>Flex</span>
                        </label>
                    </div>
        
                    {isGrid ? (
                        <>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Cols</label>
                                <Input 
                                    type="number" 
                                    placeholder="Columns" 
                                    name="cols" 
                                    defaultValue={1} 
                                    min={1}
                                    onChange={(e) => changeCols(parseInt(e.target.value))} 
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="">Rows</label>
                                <Input 
                                    type="number" 
                                    placeholder="Rows" 
                                    name="rows" 
                                    defaultValue={1} 
                                    min={1}
                                    onChange={(e) => changeRows(parseInt(e.target.value))} 
                                />
                            </div>
                        </>
                    ) :
                    (
                        <>
                        {labels.map((label, index) => {
                            return(
                            <div key={index} className='flex flex-col gap-2'>
                                <label htmlFor="">{label}</label>
                                <Select 
                                    onValueChange={(e) => { label == 'Justify' ? changeJustify(e) : label == 'Align' ? changeAlign(e) : null}}
                                    name={label == 'Justify' ? 'justify' : label == 'Align' ? 'align' : 'justify'}
                                >
                                    <SelectTrigger>
                                    <SelectValue placeholder="Select a option" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-slate-800 bg-slate-300">
                                        <SelectItem value="center">Center</SelectItem>
                                        <SelectItem value="start">Start</SelectItem>
                                        <SelectItem value="end">End</SelectItem>
                                        <SelectItem value="space-between">Space Between</SelectItem>
                                        <SelectItem value="space-around">Space Around</SelectItem>
                                        <SelectItem value="space-evenly">Space Evenly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            );
                        })}
        
                        <div className='flex gap-4'>
                            <input type="checkbox" name="reverse" id="" onChange={() => changeDirection(!direction)} />
                            <label htmlFor="">Reverse</label>
                        </div>
                        </>
                    )
                    }
                    
                    <label htmlFor="">Gap</label>
                    <input
                        type="range" 
                        min={1} 
                        max={100} 
                        step="1" 
                        defaultValue={gap ? gap : 2}
                        onChange={(e) => changeGap(parseInt(e.target.value))}
                        className="h-2 w-full appearance-none focus:outline-blue-700 bg-slate-400 dark:focus:outline-blue-600 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-blue-700 active:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:dark:bg-blue-600 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-blue-700 active:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:dark:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:rounded-full rounded-full cursor-pointer" 
                    />
                    <span className="text-sm text-white pl-2">{gap}</span>
        
                </form>
            </div>
        )
    }

    const PropertiesForm = EditorElements[selectedElement?.type].propertiesComponent;

    return (
        <div className="h-32 sm:h-full w-full sm:w-[340px] border-t-2 sm:border-l-2 sm:border-t-0 py-4 border-solid border-slate-400 dark:border-slate-200 bg-slate-100 dark:bg-slate-800 overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col px-4 pb-4" >
                <PropertiesForm elementInstance={selectedElement} />
            </div>
        </div>
    )
}
 
export default SettingsSidebar;