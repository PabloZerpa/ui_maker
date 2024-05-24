/* eslint-disable */
// @ts-nocheck 

"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { JSX, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { CirclePicker } from 'react-color';

const type: ElementsType = "CheckElement";

const extraAttributes = {
    label: "Checkbox element",
    helperText: "Helper text",
    required: false,
    placeholder: "Value here...",
    variant: 'water',
    width: "300",
    height: "40",
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
    amount: "1",
    options: "",
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
    amount: z.string().min(1).max(100),
    options: z.string().min(1).max(1000),
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

export const CheckElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: FaCheckSquare,
        label: "CheckBox",
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
        height: "40",
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
        amount: '1',
        options: '',
        code: "",
    });

    const labels = ['Label','HelperText'];
    const sizes = ['Width','Height'];
    const weights = ['Lighter','Normal','Bold','Bolder'];
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
          amount: element.extraAttributes.amount,
          options: element.extraAttributes.options,
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

    interface colorProps {
        hex: string;
    }

    const handleColor = (color: colorProps) => {
        setFields({
            ...fields,
            "color": color.hex,
        });
    };
      
    function applyChanges() {
        const createOptions = () => {
            const opts = fields.options.trim().split(';');
            let optionTag: string[] = [];
        
            for (let i = 0; i < opts.length-1; i++){
                optionTag.push(
                    `<div 
                        key=${i} 
                        className="flex flex-col gap-2"
                    >
                        <label htmlFor={${i}}>${opts[i]}</label>
                        <input 
                            id={${i}} 
                            type="checkbox" 
                            className="bg-[${fields.bg}]"
                        />
                    </div>`
                );
            }
            return optionTag;
        };

        setFields({
            ...fields,
            code: `
            <div className="flex flex-col gap-2 w-80">
              <label htmlFor="input" className='ml-1 text-sm' >
                ${fields.label}
                ${fields.required ? ("*") : ("")}
              </label>
    
              <div className="flex gap-4 w-[${fields.width}px] h-[${fields.height}px] 
                text-[${fields.font}px] font-${fields.weight} bg-[${fields.bg}] text-[${fields.color}] opacity-${fields.opacity}
                pt-[${fields.paddingTop}] pb-[${fields.paddingBot}] pr-[${fields.paddingLeft}] pl-[${fields.paddingRight}] 
                mt-[${fields.marginTop}] mb-[${fields.marginBot}] mr-[${fields.marginLeft}] ml-[${fields.marginRight}]'
              >
                ${createOptions()}
              </div>
    
              ${fields.helperText && (
                `<label htmlFor="input" className='ml-1 text-x'>${fields.helperText}</label>`
              )}
            </div>
          `
        });

        const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, opacity, amount, options, code,
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
            amount,
            options,
            opacity,
            code,
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
                {labels.map((label, index) => {
                    return(
                        <FormField
                            key={index}
                            control={form.control}
                            name={label == 'Label' ? 'label' : label == 'HelperText' ? 'helperText' : 'label'}
                            render={({ field }) => (
                                <FormItem
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={handleChanges}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                >
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={label} {...field} />
                                    </FormControl>
                                </FormItem>
                                
                            )}
                        />
                    );
                })}

                <Separator className="my-8 bg-slate-800 dark:bg-slate-400" />

                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Options</FormLabel>
                            <FormControl>
                                <Textarea name="options" placeholder="Option 1; Option 2; Option 3; ..." />
                            </FormControl>
                            <FormDescription>Separer the options with a ";"</FormDescription>
                            <FormMessage />
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
                                        <FormLabel>{size=='Font' ? 'Text Size' : size}</FormLabel>
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
                    name="font"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Text Size</FormLabel>
                            <FormControl>
                                <input
                                    type="range" 
                                    name="font"
                                    min={1} 
                                    max={64} 
                                    step="1" 
                                    defaultValue={parseInt(fields.font)}
                                    onChange={handleChanges}
                                    className="h-2 w-full appearance-none focus:outline-blue-700 bg-slate-400 dark:focus:outline-blue-600 [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-blue-700 active:[&::-moz-range-thumb]:scale-110 [&::-moz-range-thumb]:dark:bg-blue-600 [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-blue-700 active:[&::-webkit-slider-thumb]:scale-110 [&::-webkit-slider-thumb]:dark:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:rounded-full rounded-full cursor-pointer" 
                                />
                            </FormControl>
                            <span className="text-sm text-white pl-2">{fields.font}</span>
                                
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

                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                        >
                            <FormLabel>Font Weight</FormLabel>
                            <FormControl> 

                                <div className="flex gap-2">
                                    {weights.map((weight, index) => { 
                                        return(
                                            <div className="flex gap-1" key={index}>
                                                <input 
                                                    type="radio" 
                                                    name="weight"
                                                    value={weight.toLocaleLowerCase()} 
                                                />
                                                <label className="text-sm">{weight}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </FormControl>
                        </FormItem>
                        
                    )}
                />

                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs flex flex-col"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <input 
                                        type="color" 
                                        name="color"
                                        className="w-[60px] h-[30px]"
                                        onChange={handleChanges}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") e.currentTarget.blur();
                                        }}
                                    />
                                    <CirclePicker 
                                        width="220px"
                                        circleSize={24}
                                        circleSpacing={10}
                                        onChange={handleColor}
                                    />
                                </div>
                            </FormControl>
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

                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Required</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox"
                                        name="required"
                                        onChange={handleChanges}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
    const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, opacity, amount, options,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;
    
    const createOptions = () => {
        const opts = options.trim().split(';');
        let optionTag: JSX.Element[] = [];

        for (let i = 0; i < opts.length-1; i++){
            optionTag.push(
                <div 
                    key={i} 
                    className="flex flex-col gap-2"
                >
                    <label htmlFor={`${i}`}>{opts[i]}</label>
                    <input 
                        id={`${i}`} 
                        type="checkbox" 
                        style={{
                            backgroundColor: bg,
                        }} 
                    />
                </div>
            );
        }

        return optionTag;
    };

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                {label}
                {required ? ("*") : ("")}
            </label>

            <div className="flex gap-4"
                style={{
                    width: width + 'px',
                    height: height + 'px',
                    fontSize: font + 'px',
                    fontWeight: weight,
                    color: color,
                    opacity: opacity + '%',
                    paddingTop: paddingTop + 'px',
                    paddingBottom: paddingBot + 'px',
                    paddingLeft: paddingLeft + 'px',
                    paddingRight: paddingRight + 'px',
                    marginTop: marginTop + 'px',
                    marginBottom: marginBot + 'px',
                    marginLeft: marginLeft + 'px',
                    marginRight: marginRight + 'px',
                }}
            >
                {createOptions()}
            </div>

            {helperText && (
                <label htmlFor="input" className="ml-1 text-xs">{helperText}</label>
            )}
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
    const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, opacity, amount, options,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    const createOptions = () => {
        const opts = options.trim().split(';');
        let optionTag: JSX.Element[] = [];
    
        for (let i = 0; i < opts.length-1; i++){
            optionTag.push(
                <div 
                    key={i} 
                    className="flex flex-col gap-2"
                >
                    <label htmlFor={`${i}`}>{opts[i]}</label>
                    <input 
                        id={`${i}`} 
                        type="checkbox" 
                        style={{
                            backgroundColor: bg,
                        }} 
                    />
                </div>
            );
        }
        return optionTag;
    };

    return (

        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className={`ml-1 text-sm`}>
                {label}
                {required ? ("*") : ("")}
            </label>

            <div className="flex gap-4"
                style={{
                    width: width + 'px',
                    height: height + 'px',
                    fontSize: font + 'px',
                    fontWeight: weight,
                    color: color,
                    opacity: opacity + '%',
                    paddingTop: paddingTop + 'px',
                    paddingBottom: paddingBot + 'px',
                    paddingLeft: paddingLeft + 'px',
                    paddingRight: paddingRight + 'px',
                    marginTop: marginTop + 'px',
                    marginBottom: marginBot + 'px',
                    marginLeft: marginLeft + 'px',
                    marginRight: marginRight + 'px',
                }}
            >
                {createOptions()}
            </div>

            {helperText && (
                <label htmlFor="input" className={`ml-1 text-xs`}>{helperText}</label>
            )}
        </div>
    );
}