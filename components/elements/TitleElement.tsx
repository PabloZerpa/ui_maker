
"use client";
import useDesigner from "@/components/hooks/useDesigner";
import { EditorElement, EditorElementInstance, ElementsType, SubmitFunction } from "../EditorElements";
import { useEffect, useState } from "react";
import { Heading1 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { CirclePicker } from 'react-color';

const type: ElementsType = "TitleElement";

const extraAttributes = {
    label: "Text element",
    tag: "h1",
    font: "12",
    weight: "normal",
    color: "#E0E0E0",
    opacity: "100",
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
    label: z.string().min(2).max(50),
    tag: z.string().max(4),
    color: z.string().min(7).max(20),
    font: z.string().min(2).max(4),
    weight: z.string().min(2).max(50),
    opacity: z.string().min(2).max(4),
    code: z.string().min(0).max(1000),

    paddingTop: z.string().min(2).max(4),
    paddingBot: z.string().min(2).max(4),
    paddingLeft: z.string().min(2).max(4),
    paddingRight: z.string().min(2).max(4),

    marginTop: z.string().min(2).max(4),
    marginBot: z.string().min(2).max(4),
    marginLeft: z.string().min(2).max(4),
    marginRight: z.string().min(2).max(4),

});

export const TitleElement: EditorElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: Heading1,
        label: "Title",
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
        tag: 'h1',
        color: '#E0E0E0',
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
        code: "",
    });

    const tags = ['H1','H2','H3','H4','H5','H6'];
    const weights = ['Lighter','Normal','Bold','Bolder'];
    const axis = ['Top','Bot','Left','Right']

    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
          label: element.extraAttributes.label,
          tag: element.extraAttributes.tag,
          color: element.extraAttributes.color,
          font: element.extraAttributes.font,
          weight: element.extraAttributes.weight,
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
      
    function applyChanges() {

        const createTitle = () => {
            let tagSelected;
            const css = `text-[${fields?.font}px] font-${fields?.weight} color-[${fields?.color}] opacity-${fields.opacity}
                pt-[${fields?.paddingTop}] pb-[${fields?.paddingBot}] pr-[${fields?.paddingLeft}] pl-[${fields?.paddingRight}] 
                mt-[${fields?.marginTop}] mb-[${fields?.marginBot}] mr-[${fields?.marginLeft}] ml-[${fields?.marginRight}]`
                
            if(fields?.tag == 'h1'){
                tagSelected = `<h1 className={${css}} >${fields?.label}</h1>`
            }
            else if(fields?.tag == 'h2'){
                tagSelected = `<h2 className={${css}} >${fields?.label}</h2>`
            }
            else if(fields?.tag == 'h3'){
                tagSelected = `<h3 className={${css}} >${fields?.label}</h3>`
            }
            else if(fields?.tag == 'h4'){
                tagSelected = `<h4 className={${css}} >${fields?.label}</h4>`
            }
            else if(fields?.tag == 'h5'){
                tagSelected = `<h5 className={${css}} >${fields?.label}</h5>`
            }
            else{
                tagSelected = `<h6 className={${css}} >${fields?.label}</h6>`
            }
            return tagSelected;
        };

        setFields({
            ...fields,
            code: `
                ${createTitle()}
            `
        });

        const { label, tag, color, font, weight, opacity, code, paddingBot, paddingTop, paddingLeft, paddingRight, 
            marginBot, marginTop, marginLeft, marginRight } = fields;

        updateElement(element.id, {
          ...element,
          extraAttributes: {
            label,
            tag,
            color,
            font,
            weight,
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
                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem
                            className="input input-bordered w-full max-w-xs"
                            onChange={handleChanges}
                            onClick={(e) => {
                                console.log('Click');
                                e.currentTarget.blur();
                            }}
                        >
                            <FormLabel>Tag</FormLabel>
                            <FormControl>

                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => { 
                                        return(
                                            <div className="flex gap-1" key={index}>
                                                <input 
                                                    type="radio" 
                                                    name="tag"
                                                    value={tag.toLocaleLowerCase()} 
                                                />
                                                <label className="text-sm">{tag}</label>
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
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                        </FormItem>
                        
                    )}
                />

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
    const { label, tag, color, font, weight, opacity, paddingBot, paddingTop, paddingLeft, 
        paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;

    const createTitle = () => {
        let tagSelected;
        const css = {
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
        }

        if(tag == 'h1'){
            tagSelected = <h1 style={css} >{label}</h1>
        }
        else if(tag == 'h2'){
            tagSelected = <h2 style={css} >{label}</h2>
        }
        else if(tag == 'h3'){
            tagSelected = <h3 style={css} >{label}</h3>
        }
        else if(tag == 'h4'){
            tagSelected = <h4 style={css} >{label}</h4>
        }
        else if(tag == 'h5'){
            tagSelected = <h5 style={css} >{label}</h5>
        }
        else{
            tagSelected = <h6 style={css} >{label}</h6>
        }

        return tagSelected;
    };

    return (
        <div className="flex flex-col gap-2 w-80">
            <label htmlFor="input" className="ml-1 text-sm">
                Title
            </label>

            {createTitle()}
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
    const { label, tag, color, font, weight, opacity,
        paddingBot, paddingTop, paddingLeft, paddingRight, marginBot, marginTop, marginLeft, marginRight } = element.extraAttributes;
    

    const createTitle = () => {
        let tagSelected;
        const css = {
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
        }

        if(tag == 'h1'){
            tagSelected = <h1 style={css} >{label}</h1>
        }
        else if(tag == 'h2'){
            tagSelected = <h2 style={css} >{label}</h2>
        }
        else if(tag == 'h3'){
            tagSelected = <h3 style={css} >{label}</h3>
        }
        else if(tag == 'h4'){
            tagSelected = <h4 style={css} >{label}</h4>
        }
        else if(tag == 'h5'){
            tagSelected = <h5 style={css} >{label}</h5>
        }
        else{
            tagSelected = <h6 style={css} >{label}</h6>
        }

        return tagSelected;
    };

    return (
        <div>
            {createTitle()}
        </div>
    );
    
}