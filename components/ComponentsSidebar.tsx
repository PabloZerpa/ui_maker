
'use client'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useState } from 'react'
import { EditorElements } from "./EditorElements";
import SidebarButton from './SidebarButton';

interface ListElements {
    name: string;
    element: JSX.Element;
};

const elements: Array<ListElements> = [
    {   name: 'title element', element: <SidebarButton formElement={EditorElements.TitleElement} /> },
    {   name: 'paragraph element', element: <SidebarButton formElement={EditorElements.ParagraphElement} /> },
    {   name: 'separator element', element: <SidebarButton formElement={EditorElements.SeparatorElement} /> },
    {   name: 'text element', element: <SidebarButton formElement={EditorElements.TextElement} /> },
    {   name: 'number element', element: <SidebarButton formElement={EditorElements.NumberElement} /> },
    {   name: 'password element', element: <SidebarButton formElement={EditorElements.PasswordElement} /> },
    {   name: 'url element', element: <SidebarButton formElement={EditorElements.UrlElement} /> },
    {   name: 'email element', element: <SidebarButton formElement={EditorElements.EmailElement} /> },
    {   name: 'phone element', element: <SidebarButton formElement={EditorElements.PhoneElement} /> },
    {   name: 'text area element', element: <SidebarButton formElement={EditorElements.TextAreaElement} /> },
    {   name: 'date element', element: <SidebarButton formElement={EditorElements.DateElement} /> },
    {   name: 'time element', element: <SidebarButton formElement={EditorElements.TimeElement} /> },
    {   name: 'file element', element: <SidebarButton formElement={EditorElements.FileElement} /> },
    {   name: 'select element', element: <SidebarButton formElement={EditorElements.SelectElement} /> },
    {   name: 'button element', element: <SidebarButton formElement={EditorElements.ButtonElement} /> },
    {   name: 'checkbox element', element: <SidebarButton formElement={EditorElements.CheckElement} /> },
    {   name: 'radio element', element: <SidebarButton formElement={EditorElements.RadioElement} /> },
    {   name: 'pin element', element: <SidebarButton formElement={EditorElements.PinElement} /> },
    {   name: 'range element', element: <SidebarButton formElement={EditorElements.RangeElement} /> },
    {   name: 'progress element', element: <SidebarButton formElement={EditorElements.ProgressElement} /> },
    {   name: 'rating element', element: <SidebarButton formElement={EditorElements.RatingElement} /> },
    {   name: 'loader element', element: <SidebarButton formElement={EditorElements.LoaderElement} /> },
    {   name: 'codeblock element', element: <SidebarButton formElement={EditorElements.CodeBlockElement} /> },
    {   name: 'joysctick element', element: <SidebarButton formElement={EditorElements.JoystickElement} /> },
];

const ComponentSidebar = () => {

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState<ListElements[]>([]);

    const OnSearch = () => {
        const data = elements.filter((item) => item.name.includes(search.toLocaleLowerCase()));
        setSearchData(data);
    };

    return (
        <div className="h-32 sm:h-full w-full sm:w-[340px] p-2 border-r-0 sm:border-r-2 border-solid border-slate-400 dark:border-slate-200 bg-slate-100 dark:bg-slate-800 overflow-x-auto sm:overflow-x-hidden overflow-y-hidden sm:overflow-y-auto">

            <div className='py-0 hidden sm:block'>

                <h3 className="text-xl font-bold">Components</h3>
                <p className="text-sm text-foreground/70">Drag and drop elements</p>

                <div className="relative mt-4">
                    <Search className="w-5 h-4 text-blue-600 font-bold absolute top-3 left-2" />
                    <Input 
                        type="text" 
                        placeholder="Text, Button, Rating" 
                        className="input input-bordered input-md w-full max-w-xs pl-8 rounded"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={OnSearch}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] place-items-center pt-6 pb-2">
                    {search && searchData.map((item, index) => {
                            return( <div key={index}>{item.element}</div> );
                        })
                    }
                </div>
            </div>

            <div className='flex flex-row sm:flex-col gap-4'>
                <h3 className="hidden sm:block text-base font-bold">Elements</h3>
                <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 gap-[2px] place-items-center ">
                    {elements.map((e, index) => {
                        return(
                            <div key={index}>
                            {e.element}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
 
export default ComponentSidebar;