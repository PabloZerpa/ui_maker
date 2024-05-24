
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useState } from "react";
import { BiSolidJoystickButton } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Joystick } from 'react-joystick-component';
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";
import { CirclePicker } from 'react-color';

const type: ElementsType = "JoystickElement";

const extraAttributes = {
    label: "Joystick element",
    helperText: "Helper text",
    axis: false,
    placeholder: "Value here...",
    variant: 'water',
    width: "100",
    height: "60",
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

    min: "0",
    max: "100",
    step: "",
    list: "",
    code: "",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    axis: z.boolean().default(false),
    placeHolder: z.string().max(50),
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

export const JoystickElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BiSolidJoystickButton,
        label: "Joystick",
    },

    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

    validate: (formElement: EditorElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.axis) {
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
        axis: false,
        width: "100",
        height: "60",
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
        min: '0',
        max: '100',
        step: "",
        list: "",
        code: "",
    });

    // const labels = ['Label','Placeholder','HelperText'];
    const sizes = ['Background','Sphere','Minimun','Maximun','Step'];
    const colors = ['Background','Sphere'];
    const axis = ['Top','Bot','Left','Right'];

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          label: element.extraAttributes.label,
          helperText: element.extraAttributes.helperText,
          axis: element.extraAttributes.axis,
          placeHolder: element.extraAttributes.placeHolder,
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
        if(e.target.name === "axis"){
            setFields({
                ...fields,
               "axis": !fields.axis,
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
                <div className="flex flex-col gap-4">
                <div 
                    className="opacity-${fields.opacity} pt-[${fields.paddingTop}] pb-[${fields.paddingBot}] pr-[${fields.paddingLeft}] pl-[${fields.paddingRight}] 
                    mt-[${fields.marginTop}] mb-[${fields.marginBot}] mr-[${fields.marginLeft}] ml-[${fields.marginRight}]"
                >
                    <Joystick 
                        size=${parseInt(fields.width)} 
                        stickSize=${parseInt(fields.height)} 
                        baseColor=${fields.bg} 
                        stickColor=${fields.color} 
                        start={onStart}
                        move={onMove} 
                        stop={onStop}
                        minDistance={50} 
                    >
                    </Joystick>
                </div>
        
                ${fields.axis ? 
                    (
                    `<div className="flex gap-2">
                        <span>Axis x: {manualTiltAngleX?.toFixed(0)}°</span>
                        <span>Axis y: {manualTiltAngleY?.toFixed(0)}°</span>
                        <span>Direction: {direction}</span>
                    </div>`
                    ) : 
                    (null)
                }
                </div>
            `
        });

        const { label, helperText, placeHolder, color, bg, variant, axis, width, height, opacity, font, weight, min, max, step, list, code,
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
            axis,
            width, 
            height,
            font,
            weight,
            opacity,
            min, max,
            step, list, code,
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

                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {sizes.map((size, index) => {
                        return(
                            <FormField
                                key={index}
                                control={form.control}
                                name={size == 'Background' ? 'width' : size == 'Sphere' ? 'height' : size== 'Minimun' ? 'min' : 
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
                            <FormLabel>Background Color</FormLabel>
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
                            <FormLabel>Sphere Color</FormLabel>
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

                <FormField
                    control={form.control}
                    name="axis"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Axis</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox"
                                        name="axis"
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
    const { label, helperText, placeHolder, color, bg, variant, axis, width, height, font, weight, min, max, step, list, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-4">
            <div
                style={{
                    position: "relative",
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
                <Joystick 
                    size={parseInt(width)} 
                    stickSize={parseInt(height)} 
                    baseColor={bg} 
                    stickColor={color} 
                    minDistance={50} 
                >
                </Joystick>
            </div>

            {axis ? 
                (
                    <div className="flex gap-2">
                        <span>Axis x: </span>
                        <span>Axis y: </span>
                        <span>Direction: </span>
                    </div>
                ) : 
                (null)
            }
            
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
    const [[manualTiltAngleX, manualTiltAngleY], setManualTiltAngle] = useState([0,0] as Array<number|null>);
    const [direction, setDirection] = useState('');
    const { label, helperText, placeHolder, color, bg, variant, axis, width, height, font, weight, min, max, step, list, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    function onStart(event: IJoystickUpdateEvent): void {
        
    }

    function onMove(event: IJoystickUpdateEvent): void {
        if(event.x && event.y)
            setManualTiltAngle([event.y * 100, event.x * 100]);
        if(event.direction)
            setDirection(event.direction);
    }

    function onStop(event: IJoystickUpdateEvent): void {
        setManualTiltAngle([0, 0]);
        setDirection('Stop');
    }

    return (
        <div className="flex flex-col gap-4">
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

                <Joystick 
                    size={parseInt(width)} 
                    stickSize={parseInt(height)} 
                    baseColor={bg} 
                    stickColor={color} 
                    start={onStart}
                    move={onMove} 
                    stop={onStop}
                    minDistance={50} 
                >
                </Joystick>
            </div>

            {axis ? 
                (
                    <div className="flex gap-2">
                        <span>Axis x: {manualTiltAngleX?.toFixed(0)}°</span>
                        <span>Axis y: {manualTiltAngleY?.toFixed(0)}°</span>
                        <span>Direction: {direction}</span>
                    </div>
                ) : 
                (null)
            }
        </div>
    );
}