
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const type: ElementsType = "RangeElement";

const extraAttributes = {
    label: "Range element",
    helperText: "Helper text",
    required: false,
    variant: 'water',
    width: "300",
    height: "10",
    font: "12",
    weight: "normal",
    color: "#E0E0E0",
    bg: "#191E24",
    paddingTop: "0",
    paddingBot: "0",
    paddingLeft: "0",
    paddingRight: "0",
    marginTop: "0",
    marginBot: "0",
    marginLeft: "0",
    marginRight: "0",

    min: "0",
    max: "100",
    step: "",
    list: "",
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
    min: z.string().min(0).max(0),
    max: z.string().min(1).max(10000),
    step: z.string().min(0).max(100),
    list: z.string().min(0).max(100),
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

export const RangeElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: SlidersHorizontal,
        label: "Range",
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
        color: '#E0E0E0',
        bg: '#191E24',
        variant: '',
        required: false,
        width: "300",
        height: "10",
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
        min: '0',
        max: '100',
        step: "",
        list: "",
        code: "",
    });

    const labels = ['Label','HelperText'];
    const sizes = ['Width','Height','Minimun','Maximun','Step'];
    const weights = ['Lighter','Normal','Bold','Bolder'];
    const colors = ['Text','Background'];
    const axis = ['Top','Bot','Left','Right'];

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
          min: element.extraAttributes.min,
          max: element.extraAttributes.max,
          step: element.extraAttributes.step,
          list: element.extraAttributes.list,
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

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);
      
    function applyChanges() {
        setFields({
            ...fields,
            code: `
            <div className="flex flex-col gap-2 w-80">
              <label htmlFor="basic-range-slider-usage" className="sr-only">Example range</label>
              <input type="range" 
                  className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
                  disabled:pointer-events-none focus:outline-none
                  [&::-webkit-slider-thumb]:w-2.5
                  [&::-webkit-slider-thumb]:h-2.5
                  [&::-webkit-slider-thumb]:-mt-0.5
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:duration-150
                  [&::-webkit-slider-thumb]:ease-in-out
                  [&::-webkit-slider-thumb]:dark:bg-slate-700
    
                  [&::-moz-range-thumb]:w-2.5
                  [&::-moz-range-thumb]:h-2.5
                  [&::-moz-range-thumb]:appearance-none
                  [&::-moz-range-thumb]:bg-white
                  [&::-moz-range-thumb]:border-4
                  [&::-moz-range-thumb]:border-blue-600
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:duration-150
                  [&::-moz-range-thumb]:ease-in-out
    
                  [&::-webkit-slider-runnable-track]:w-full
                  [&::-webkit-slider-runnable-track]:h-2
                  [&::-webkit-slider-runnable-track]:bg-gray-100
                  [&::-webkit-slider-runnable-track]:rounded-full
                  [&::-webkit-slider-runnable-track]:dark:bg-gray-900
    
                  [&::-moz-range-track]:w-full
                  [&::-moz-range-track]:h-2
                  [&::-moz-range-track]:bg-gray-100
                  [&::-moz-range-track]:rounded-full" id="basic-range-slider-usage" 
              />
            </div>
          `
        });

        const { label, helperText, color, bg, variant, required, width, height, font, weight, min, max, step, list, code,
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
            min, max,
            step, list, code,
            paddingBot, paddingTop, paddingLeft, paddingRight, 
            marginBot, marginTop, marginLeft, marginRight
          },
        });
    }

    const handleValue = (value: number) => {
        setFields({
            ...fields,
            "font": value.toString(),
        });
    };

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

    return (
        <Form {...form}>
            <form 
                onBlur={applyChanges}
                onSubmit={(e) => { e.preventDefault(); }} 
                className="space-y-3"
            >

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {sizes.map((size, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={size == 'Width' ? 'width' : size == 'Height' ? 'height' : size== 'Minimun' ? 'min' : 
                                size == "Maximun" ? 'max' : size == "Step" ? 'step' : 'width'}
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

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {axis.map((axis, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={axis == 'Top' ? 'paddingTop' : axis == 'Bot' ? 'paddingBot' : 
                                        axis == 'Left' ? 'paddingLeft' : axis == 'Right' ? 'paddingRight' : 'paddingTop'}
                                render={({ field }) => (
                                    <FormItem
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={handleChanges}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") e.currentTarget.blur();
                                        }}
                                    >
                                        <FormLabel>Padding {axis}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="4px..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )
                    })}
                </div>

                <Separator className="my-8 bg-slate-800 dark:bg-slate-400" />

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {axis.map((axis, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={axis == 'Top' ? 'marginTop' : axis == 'Bot' ? 'marginBot' : 
                                        axis == 'Left' ? 'marginLeft' : axis == 'Right' ? 'marginRight' : 'marginTop'}
                                render={({ field }) => (
                                    <FormItem
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={handleChanges}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") e.currentTarget.blur();
                                        }}
                                    >
                                        <FormLabel>Margin {axis}</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="4px..." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )
                    })}
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
    const { label, helperText, color, bg, variant, required, width, height, font, weight, min, max, step, list,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-80">

            <label htmlFor="basic-range-slider-usage" className="sr-only">Example range</label>
            <input type="range" 
                className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
                disabled:pointer-events-none focus:outline-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:-mt-0.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:ease-in-out
                [&::-webkit-slider-thumb]:dark:bg-slate-700

                [&::-moz-range-thumb]:w-2.5
                [&::-moz-range-thumb]:h-2.5
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-blue-600
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-150
                [&::-moz-range-thumb]:ease-in-out

                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:h-2
                [&::-webkit-slider-runnable-track]:bg-gray-100
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:dark:bg-gray-900

                [&::-moz-range-track]:w-full
                [&::-moz-range-track]:h-2
                [&::-moz-range-track]:bg-gray-100
                [&::-moz-range-track]:rounded-full" id="basic-range-slider-usage" 
                style={{
                    width: width + 'px',
                    height: height + 'px',
                    // backgroundColor: bg,
                    // color: color,
                    paddingTop: paddingTop + 'px',
                    paddingBottom: paddingBot + 'px',
                    paddingLeft: paddingLeft + 'px',
                    paddingRight: paddingRight + 'px',
                    marginTop: marginTop + 'px',
                    marginBottom: marginBot + 'px',
                    marginLeft: marginLeft + 'px',
                    marginRight: marginRight + 'px',
                }}
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

    const { label, helperText, color, bg, variant, required, width, height, font, weight, min, max, step, list,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;
    const [output, setOutput] = useState(String(parseInt(max)/2));

    return (
        <div className="flex flex-col gap-2 w-80">

            <label htmlFor="basic-range-slider-usage" className="sr-only">Example range</label>
            <input type="range"
                onChange={(e) => setOutput(e.target.value)} 
                className="w-full bg-transparent cursor-pointer appearance-none disabled:opacity-50 
                disabled:pointer-events-none focus:outline-none
                [&::-webkit-slider-thumb]:w-2.5
                [&::-webkit-slider-thumb]:h-2.5
                [&::-webkit-slider-thumb]:-mt-0.5
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-150
                [&::-webkit-slider-thumb]:ease-in-out
                [&::-webkit-slider-thumb]:dark:bg-slate-700

                [&::-moz-range-thumb]:w-2.5
                [&::-moz-range-thumb]:h-2.5
                [&::-moz-range-thumb]:appearance-none
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-4
                [&::-moz-range-thumb]:border-blue-600
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:transition-all
                [&::-moz-range-thumb]:duration-150
                [&::-moz-range-thumb]:ease-in-out

                [&::-webkit-slider-runnable-track]:w-full
                [&::-webkit-slider-runnable-track]:h-2
                [&::-webkit-slider-runnable-track]:bg-gray-100
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:dark:bg-gray-900

                [&::-moz-range-track]:w-full
                [&::-moz-range-track]:h-2
                [&::-moz-range-track]:bg-gray-100
                [&::-moz-range-track]:rounded-full" id="basic-range-slider-usage" 
            />
            <span>{output}</span>

        </div>
    );
}