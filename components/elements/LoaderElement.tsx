
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useEffect, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { CirclePicker } from 'react-color';

const type: ElementsType = "LoaderElement";

const extraAttributes = {
    duration: "2",
    animation: "spin",
    figure: "",
    size: "4",
    width: "40",
    height: "40",
    color: "#208fda",
    bg: "#939393",
    opacity: "100",
    variant: 'water',
    paddingTop: "0",
    paddingBot: "0",
    paddingLeft: "0",
    paddingRight: "0",
    marginTop: "0",
    marginBot: "0",
    marginLeft: "0",
    marginRight: "0",
    code: "",
};

const propertiesSchema = z.object({
    duration: z.string().min(2).max(50),
    animation: z.string().max(50),
    figure: z.string().max(50),
    variant: z.string().min(2).max(12),
    color: z.string().min(7).max(20),
    bg: z.string().min(7).max(20),
    width: z.string().min(2).max(4),
    height: z.string().min(2).max(4),
    size: z.string().min(2).max(4),
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

export const LoaderElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: ImSpinner,
        label: "Loader",
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
        duration: "2",
        animation: "spin",
        figure: "",
        size: "4",
        width: "40",
        height: "40",
        color: "#208fda",
        bg: "#939393",
        opacity: "100",
        variant: 'water',
        paddingTop: "0",
        paddingBot: "0",
        paddingLeft: "8",
        paddingRight: "0",
        marginTop: "0",
        marginBot: "0",
        marginLeft: "0",
        marginRight: "0",
        code: "",
    });

    const sizes = ['Size','Width','Height'];
    const colors = ['Loading','Background'];
    const axis = ['Top','Bot','Left','Right']

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          duration: element.extraAttributes.duration,
          animation: element.extraAttributes.animation,
          figure: element.extraAttributes.figure,
          color: element.extraAttributes.color,
          bg: element.extraAttributes.color,
          variant: element.extraAttributes.variant,
          width: element.extraAttributes.width,
          height: element.extraAttributes.height,
          size: element.extraAttributes.size,
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
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        });
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
                <div className="animate-spin rounded-full w-[${fields.width}px] h-[${fields.height}px]
                    bg-[${fields.bg}] border-[${fields.size}px] border-[${fields.bg}] opacity-${fields.opacity} border-t-[${fields.size}px] border-t-[${fields.color}]
                    pt-[${fields.paddingTop}] pb-[${fields.paddingBot}] pr-[${fields.paddingLeft}] pl-[${fields.paddingRight}] 
                    mt-[${fields.marginTop}] mb-[${fields.marginBot}] mr-[${fields.marginLeft}] ml-[${fields.marginRight}]"
                >
                </div>
            `
        });

        const { duration, animation, figure, color, bg, variant, size, width, height, code, opacity,
            paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            duration, 
            animation, 
            figure,
            color,
            bg,
            variant,
            size,
            width, 
            height,
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

            <div className="grid grid-cols-1 grid-rows-2 gap-4">
                {sizes.map((size, index) => {
                    return(
                        <FormField
                            key={index}
                            control={form.control}
                            name={size == 'Width' ? 'width' : size == 'Height' ? 'height' : size == 'Size' ? 'size' : 
                                size== 'Duration' ? 'duration' : 'width'}
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
                            <FormLabel>Loading Color</FormLabel>
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
                            <FormLabel>Background Color</FormLabel>
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
    const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, min, max, size, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div className="animate-spin"
            style={{
                borderColor: bg,
                borderWidth: size + 'px',
                borderTopWidth: size + 'px',
                borderTopColor: color,
                borderRadius: "100%",
                width: width + 'px',
                height: height + 'px',
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
    const { label, helperText, placeHolder, color, bg, variant, required, width, height, font, weight, min, max, size, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div className="animate-waving-hand"
            style={{
                borderColor: bg,
                borderWidth: size + 'px',
                borderTopWidth: size + 'px',
                borderTopColor: color,
                borderRadius: "100%",
                width: width + 'px',
                height: height + 'px',
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
        </div>
    );
}