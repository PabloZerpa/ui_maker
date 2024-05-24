
/* eslint-disable */
// @ts-nocheck 

import useDesigner from "./hooks/useDesigner";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { CircleCheck, CodeXml, Copy } from "lucide-react";
import clsx from "clsx";
import CodeMirror from '@uiw/react-codemirror';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { javascript } from '@codemirror/lang-javascript';

function CodeBlocks() {
  const { elements, selectedSize } = useDesigner();
  const [copyState, setCopyState ] = useState<string | null>(null);
  const [code, setCode] = useState('');

  let codigo = `
    <div 
      className="max-w-[620px] flex flex-col flex-grow 
      gap-8 bg-zinc-800 h-full w-full rounded-2xl p-8 overflow-y-auto">`;

  useEffect(() => {
    
    elements.map((element) => {
      codigo = codigo + element.extraAttributes?.code;
    });

    codigo = codigo + `
      </div>`;
    setCode(codigo);
  }, [elements]);

  return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'} className="hover:bg-slate-400">
                  <CodeXml /> 
                </Button>
                
            </DialogTrigger>
        <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b flex flex-col justify-center items-center">
          <p className="text-lg font-bold text-muted-foreground">Code of the page</p>
          <p className="text-sm text-muted-foreground">This is the jsx code</p>
        </div>

        <div 
          className='flex flex-grow items-center justify-center h-[80vh] w-full relative overflow-y-auto 
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
          >
            <div className="relative h-full m-auto rounded-lg dark:bg-slate-700 bg-slate-300
                flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto"
            >
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size={'icon'} 
                    className="absolute right-0 top-0 z-40"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      setCopyState('Copied');
                      setTimeout(() => {
                        setCopyState(null);
                      }, 1000);
                    }}
                  >
                    {copyState ? (
                        <CircleCheck className="h-6 w-6 text-green-700" />
                      ) : (
                        <Copy className="h-6 w-6 text-blue-600 hover:text-blue-500" />
                      )
                  }
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black">
                    <p>Copy</p>
                </TooltipContent> 
              </Tooltip>

                <CodeMirror 
                  theme={atomone} 
                  value={code} 
                  height="720px" 
                  extensions={[javascript({ jsx: true })]} 
                />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CodeBlocks;