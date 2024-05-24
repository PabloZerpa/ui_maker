
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useEffect, useState } from "react";
import { FaBarsProgress } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { CirclePicker } from 'react-color';
import { Separator } from "../ui/separator";

const type: ElementsType = "ProgressElement";

const extraAttributes = {
    label: "Progress element",
    helperText: "Helper text",
    required: false,
    variant: 'water',
    width: "300",
    height: "10",
    font: "12",
    weight: "normal",
    color: "#146ed4",
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

    total: "70",
    max: "100",
    code: "",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    variant: z.string().min(2).max(12),
    color: z.string().min(7).max(20),
    bg: z.string().min(7).max(20),
    width: z.string().min(2).max(4),
    height: z.string().min(2).max(4),
    font: z.string().min(2).max(4),
    weight: z.string().min(2).max(50),
    total: z.string().min(0).max(1000),
    max: z.string().min(1).max(1000),
    opacity: z.string().min(2).max(4),
    code: z.string(),

    paddingTop: z.string().min(2).max(4),
    paddingBot: z.string().min(2).max(4),
    paddingLeft: z.string().min(2).max(4),
    paddingRight: z.string().min(2).max(4),

    marginTop: z.string().min(2).max(4),
    marginBot: z.string().min(2).max(4),
    marginLeft: z.string().min(2).max(4),
    marginRight: z.string().min(2).max(4),

});

export const ProgressElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: FaBarsProgress,
        label: "Progress",
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
        helperText: '',
        color: '#146ed4',
        bg: '#191E24',
        variant: '',
        required: false,
        width: "300",
        height: "10",
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
        total: '70',
        max: '100',
        code: "",
    });

    const labels = ['Label','HelperText'];
    const sizes = ['Width','Height','Total'];
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
          color: element.extraAttributes.color,
          bg: element.extraAttributes.color,
          variant: element.extraAttributes.variant,
          width: element.extraAttributes.width,
          height: element.extraAttributes.height,
          font: element.extraAttributes.font,
          weight: element.extraAttributes.weight,
          total: element.extraAttributes.total,
          max: element.extraAttributes.max,
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

    const handleBg = (color: colorProps) => {
        setFields({
            ...fields,
            "bg": color.hex,
        });
    };
      
    function applyChanges() {
        setFields({
            ...fields,
            code: `
                <div 
                className="rounded-full w-[${fields.width}px] h-[${fields.height}px] text-[${fields.font}px] font-${fields.weight} bg-[${fields.bg}] opacity-${fields.opacity}
                    pt-[${fields.paddingTop}] pb-[${fields.paddingBot}] pr-[${fields.paddingLeft}] pl-[${fields.paddingRight}] 
                    mt-[${fields.marginTop}] mb-[${fields.marginBot}] mr-[${fields.marginLeft}] ml-[${fields.marginRight}]"
                >
                <div 
                    className="font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${fields.total}%] h-[${fields.height}px] 
                    text-[${fields.font}px] font-${fields.weight} bg-[${fields.bg}]"
                > 
                    ${fields.total}%
                </div>
                </div>
            `
        });

        const { label, helperText, color, bg, variant, required, width, height, font, weight, opacity, total, max, code,
            paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            helperText,
            color,
            bg,
            variant,
            required,
            width, 
            height,
            font,
            weight,
            opacity,
            total, max, code,
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

                <div className="grid grid-cols-1 grid-rows-2 gap-4">
                    {sizes.map((size, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={size == 'Width' ? 'width' : size == 'Height' ? 'height' : size== 'Total' ? 'total' : 'width'}
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

                <FormField
                    control={form.control}
                    name="bg"
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
                                        name="bg"
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
                                        onChange={handleBg}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />

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
    const { label, helperText, color, bg, variant, required, width, height, font, weight, opacity, total, max,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
            <div 
                className="rounded-full"
                style={{
                    width: width + 'px',
                    height: height + 'px',
                    backgroundColor: bg,
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
                <div 
                    className="font-medium text-blue-100 flex justify-center items-center p-0.5 leading-none rounded-full"
                    style={{
                        width: total + '%',
                        height: height + 'px',
                        backgroundColor: color,
                        fontSize: font + 'px',
                        fontWeight: weight,
                    }}
                > 
                    {total}%
                </div>
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
    const { label, helperText, color, bg, variant, required, width, height, font, weight, opacity, total, max,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div 
            className="rounded-full"
            style={{
                width: width + 'px',
                height: height + 'px',
                backgroundColor: bg,
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
            <div 
                className="font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{
                    width: total + '%',
                    height: height + 'px',
                    backgroundColor: color,
                    fontSize: font + 'px',
                    fontWeight: weight,
                }}
            > 
                {total}%
            </div>
            
        </div>

    );
}