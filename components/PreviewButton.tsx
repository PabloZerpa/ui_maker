
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { EditorElements } from "./EditorElements";
import { ScanEye } from "lucide-react";
import clsx from "clsx";

function PreviewButton() {
  const { elements, selectedSize } = useDesigner();

  return (
      <Dialog>
        <DialogTrigger asChild>
              <Button variant="ghost" size={'icon'} className="hover:bg-slate-400">
                <ScanEye />
              </Button>

        </DialogTrigger>
        <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
          <div className="px-4 py-2 border-b flex flex-col justify-center items-center">
            <p className="text-lg font-bold text-muted-foreground">Form preview</p>
            <p className="text-sm text-muted-foreground">This is how your form will look like to your users.</p>
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
              <div className="max-w-[920px] h-full m-auto rounded-lg dark:bg-slate-700 bg-slate-300
                flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto"
              >
                {elements.map((element) => {
                  const EditorComponent = EditorElements[element.type].formComponent;
                  return <EditorComponent key={element.id} elementInstance={element} />;
                })}
                
            </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  );
}

export default PreviewButton;