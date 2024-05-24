
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useEffect, useState } from "react";
import { RiCodeBoxFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import CodeMirror from '@uiw/react-codemirror';
import { atomone } from '@uiw/codemirror-theme-atomone';
import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
import { bbedit } from '@uiw/codemirror-theme-bbedit';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { githubDark } from '@uiw/codemirror-theme-github';

import { javascript } from '@codemirror/lang-javascript';
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const type: ElementsType = "CodeBlockElement";

const extraAttributes = {
    label: `const Example = () => {
        return(
            <div>Example</div>
        );
    }`,
    helperText: "Helper text",
    required: false,
    placeholder: "Value here...",
    variant: 'water',
    width: "300",
    height: "100",
    font: "12",
    weight: "normal",
    color: "#E0E0E0",
    bg: "#191E24",
    opacity: "100",
    paddingTop: "0",
    paddingBot: "0",
    paddingLeft: "0",
    paddingRight: "0",
    marginTop: "0",
    marginBot: "0",
    marginLeft: "0",
    marginRight: "0",

    size: "20",
    minlength: "0",
    maxlength: "100",
    pattern: "",
    theme: "atomone",
    code: "",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    variant: z.string().min(2).max(12),
    color: z.string().min(7).max(20),
    bg: z.string().min(7).max(20),
    width: z.string().min(2).max(4),
    height: z.string().min(2).max(4),
    font: z.string().min(2).max(4),
    weight: z.string().min(2).max(50),
    minlength: z.string().min(0).max(100),
    maxlength: z.string().min(1).max(10000),
    cols: z.string().min(1).max(100),
    rows: z.string().min(1).max(100),
    theme: z.string().min(1).max(100),
    opacity: z.string().min(2).max(4),
    code: z.string().min(1).max(1000),

    paddingTop: z.string().min(2).max(4),
    paddingBot: z.string().min(2).max(4),
    paddingLeft: z.string().min(2).max(4),
    paddingRight: z.string().min(2).max(4),

    marginTop: z.string().min(2).max(4),
    marginBot: z.string().min(2).max(4),
    marginLeft: z.string().min(2).max(4),
    marginRight: z.string().min(2).max(4),

});

export const CodeBlockElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: RiCodeBoxFill,
        label: "CodeBlock",
    },

    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: EditorElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required) {
          return currentValue.length > 0;
        }
    
        return true;
    },
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

// ==================== SETTINGS OF THE ELEMENT ====================
function PropertiesComponent({ elementInstance }: { elementInstance: EditorElementInstance }){
    const [fields, setFields] = useState({
        label: '',
        placeHolder: '',
        helperText: '',
        color: '#E0E0E0',
        bg: '#191E24',
        variant: '',
        required: false,
        width: "300",
        height: "100",
        font: "12",
        weight: "normal",
        opacity: "100",
        paddingTop: "0",
        paddingBot: "0",
        paddingLeft: "8",
        paddingRight: "0",
        marginTop: "0",
        marginBot: "0",
        marginLeft: "0",
        marginRight: "0",
        minlength: '',
        maxlength: '',
        cols: '',
        rows: '',
        theme: 'atomone',
        code: "",
    });

    const labels = ['Label','Placeholder','HelperText'];
    const sizes = ['Width','Height'];
    const colors = ['Text','Background'];
    const axis = ['Top','Bot','Left','Right']

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          label: element.extraAttributes.label,
          helperText: element.extraAttributes.helperText,
          required: element.extraAttributes.required,
          placeHolder: element.extraAttributes.placeHolder,
          color: element.extraAttributes.color,
          bg: element.extraAttributes.color,
          variant: element.extraAttributes.variant,
          width: element.extraAttributes.width,
          height: element.extraAttributes.height,
          font: element.extraAttributes.font,
          weight: element.extraAttributes.weight,
          minlength: element.extraAttributes.minlength,
          maxlength: element.extraAttributes.maxlength,
          cols: element.extraAttributes.cols,
          rows: element.extraAttributes.rows,
          theme: element.extraAttributes.theme,
          opacity: element.extraAttributes.opacity,
          code: element.extraAttributes.code,

          paddingTop: element.extraAttributes.paddingTop,
          paddingBot: element.extraAttributes.paddingBot,
          paddingLeft: element.extraAttributes.paddingLeft,
          paddingRight: element.extraAttributes.paddingRight,
          marginTop: element.extraAttributes.marginTop,
          marginBot: element.extraAttributes.marginBot,
          marginLeft: element.extraAttributes.marginLeft,
          marginRight: element.extraAttributes.marginRight,
        },
    });

    function handleChanges(e: React.ChangeEvent<HTMLInputElement>){
        console.log(e.target.name);
        console.log(e.target.value);

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

    function applyChanges() {
        setFields({
            ...fields,
            code: `
                <div 
                className="opacity-${fields.opacity} pt-[${fields.paddingTop}] pb-[${fields.paddingBot}] pr-[${fields.paddingLeft}] pl-[${fields.paddingRight}] 
                    mt-[${fields.marginTop}] mb-[${fields.marginBot}] mr-[${fields.marginLeft}] ml-[${fields.marginRight}]"
                >
                <CodeMirror 
                    theme={atomone} 
                    value='${fields.label}'
                    width=${fields.width + 'px'}
                    height=${fields.height + 'px'}
                    extensions={[javascript({ jsx: true })]} 
                />
                </div>
            `
        });

        const { label, helperText, placeHolder, color, bg, variant, required, width, height, opacity, font, weight, minlength, maxlength, cols, rows, theme, code,
            paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            helperText,
            placeHolder,
            color,
            bg,
            variant,
            required,
            width, 
            height,
            font,
            weight,
            opacity,
            minlength, maxlength,
            cols, rows,theme, code,
            paddingBot, paddingTop, paddingLeft, paddingRight, 
            marginBot, marginTop, marginLeft, marginRight
          },
        });
    }

    return (
        <Form {...form}>
            <form 
                onBlur={applyChanges}
                onSubmit={(e) => { e.preventDefault(); }} 
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Textarea cols={4} rows={4} placeholder="Paragraph" {...field} />
                            </FormControl>
                        </FormItem>
                        
                    )}
                />
                
                <div className="grid grid-cols-2 grid-rows-auto gap-4">
                    {sizes.map((size, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={size == 'Width' ? 'width' : size == 'Height' ? 'height' : 'width'}
                                render={({ field }) => (
                                    <FormItem
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={handleChanges}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") e.currentTarget.blur();
                                        }}
                                    >
                                        <FormLabel>{size}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="80..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        );
                    })}
                </div>

                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Theme</FormLabel>
                            <FormControl>
                                <Select 
                                    name="theme"
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a theme" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="dark:bg-slate-800 bg-slate-300">
                                        <SelectItem value="atomone">Atomone</SelectItem>
                                        <SelectItem value="dracula">Dracula</SelectItem>
                                        <SelectItem value="androidstudio">Androidstudio</SelectItem>
                                        <SelectItem value="bbedit">Bbedit</SelectItem>
                                        <SelectItem value="github">Github</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="opacity"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Opacity</FormLabel>
                            <FormControl>
                                <input
                                    type="range" 
                                    name="opacity"
                                    min={1} 
                                    max={100} 
                                    step="1" 
                                    defaultValue={parseInt(fields.opacity)}
                                    onChange={handleChanges}
                                    className="h-2 w-full appearance-none focus:outline-blue-700 bg-slate-400 dark:focus:outline-blue-600 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-blue-700 active:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:dark:bg-blue-600 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-blue-700 active:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:dark:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:rounded-full rounded-full cursor-pointer" 
                                />
                            </FormControl>
                            <span className="text-sm text-white pl-2">{fields.opacity}</span>
                                
                        </FormItem>
                        
                    )}
                />

                <Separator className="my-8 bg-slate-800 dark:bg-slate-400" />

                <span>Padding</span>
                <div className="grid grid-cols-3 grid-rows-3 gap-2">
                    <div></div>
                    <FormField
                        control={form.control}
                        name='paddingTop'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>

                    <FormField
                        control={form.control}
                        name='paddingLeft'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>
                    <FormField
                        control={form.control}
                        name='paddingRight'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div></div>
                    <FormField
                        control={form.control}
                        name='paddingBot'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>
                </div>

                <Separator className="my-8 bg-slate-800 dark:bg-slate-400" />

                <span>Margin</span>
                <div className="grid grid-cols-3 grid-rows-3 gap-2">
                    <div></div>
                    <FormField
                        control={form.control}
                        name='marginTop'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>

                    <FormField
                        control={form.control}
                        name='marginLeft'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>
                    <FormField
                        control={form.control}
                        name='marginRight'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div></div>
                    <FormField
                        control={form.control}
                        name='marginBot'
                        render={({ field }) => (
                            <FormItem
                                className="input input-bordered w-full max-w-xs"
                                onChange={handleChanges}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur();
                                }}
                            >
                                <FormControl>
                                    <Input type="number" placeholder="4px..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div></div>
                </div>

            </form>
        </Form>
    );
};

type CustomInstance = EditorElementInstance & {
    extraAttributes: typeof extraAttributes;
};

// ==================== EDITING ELEMENT ====================
function DesignerComponent({ elementInstance }: { elementInstance: EditorElementInstance }){
    const element = elementInstance as CustomInstance;
    const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, minlength, maxlength, cols, rows, theme, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div
            style={{
                paddingTop: paddingTop + 'px',
                paddingBottom: paddingBot + 'px',
                paddingLeft: paddingLeft + 'px',
                paddingRight: paddingRight + 'px',
                marginTop: marginTop + 'px',
                marginBottom: marginBot + 'px',
                marginLeft: marginLeft + 'px',
                marginRight: marginRight + 'px',
                opacity: opacity + '%',
        }}>
            <CodeMirror 
                theme={theme == "atomone" ? atomone : theme == "dracula" ? dracula : theme == "androidstudio" ? androidstudio : 
                    theme == "bbedit" ? bbedit : githubDark }
                value={label} 
                width={width + 'px'}
                height={height + 'px'}
                extensions={[javascript({ jsx: true })]} 
            />
        </div>
    );
}

// ==================== PREVIEW OF THE ELEMENT ====================
function FormComponent({ elementInstance, submitValue, isInvalid, defaultValue, }: {
    elementInstance: EditorElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
}){
    const element = elementInstance as CustomInstance;
    
    const { label, width, height, font, weight, minlength, maxlength, cols, rows, theme, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div
            style={{
                paddingTop: paddingTop + 'px',
                paddingBottom: paddingBot + 'px',
                paddingLeft: paddingLeft + 'px',
                paddingRight: paddingRight + 'px',
                marginTop: marginTop + 'px',
                marginBottom: marginBot + 'px',
                marginLeft: marginLeft + 'px',
                marginRight: marginRight + 'px',
                opacity: opacity + '%',
        }}>
            <CodeMirror 
                theme={theme == "atomone" ? atomone : theme == "dracula" ? dracula : theme == "androidstudio" ? androidstudio : 
                    theme == "bbedit" ? bbedit : githubDark }
                value={label} 
                width={width + 'px'}
                height={height + 'px'}
                extensions={[javascript({ jsx: true })]} 
            />
        </div>
    );
}