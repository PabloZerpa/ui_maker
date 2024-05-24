
import { ButtonElement } from "./elements/ButtonElement";
import { CheckElement } from "./elements/CheckElement";
import { DateElement } from "./elements/DateElement";
import { EmailElement } from "./elements/EmailElement";
import { FileElement } from "./elements/FileElement";
import { NumberElement } from "./elements/NumberElement";
import { ParagraphElement } from "./elements/ParagraphElement";
import { PasswordElement } from "./elements/PasswordElement";
import { PhoneElement } from "./elements/PhoneElement";
import { PinElement } from "./elements/PinElement";
import { ProgressElement } from "./elements/ProgressElement";
import { RadioElement } from "./elements/RadioElement";
import { RangeElement } from "./elements/RangeElement";
import { RatingElement } from "./elements/RatingElement";
import { SelectElement } from "./elements/SelectElement";
import { SeparatorElement } from "./elements/SeparatorElement";
import { TextAreaElement } from "./elements/TextAreaElement";
import { TextElement } from "./elements/TextElement";
import { TimeElement } from "./elements/TimeElement";
import { TitleElement } from "./elements/TitleElement";
import { UrlElement } from "./elements/UrlElement";
import { JoystickElement } from "./elements/JoystickElement";
import { CodeBlockElement } from "./elements/CodeBlockElement";
import { LoaderElement } from "./elements/LoaderElement";

export type ElementsType = "TitleElement" | "ParagraphElement" | "SeparatorElement" | "TextElement" | "NumberElement" | 
"PasswordElement" | "UrlElement" | "EmailElement" | "PhoneElement" | "TimeElement" | "DateElement" | "JoystickElement" |
"FileElement" | "TextAreaElement" | "RangeElement" | "RatingElement" |  "PinElement" | "SelectElement" | 
"CheckElement" | "RadioElement" | "ProgressElement" |"ButtonElement" | "CodeBlockElement" | "LoaderElement";

export type SubmitFunction = (key: string, value: string) => void;

export type EditorElement = {
    type: ElementsType;

    construct: (id: string) => EditorElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: EditorElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: EditorElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: EditorElementInstance;
    }>;

    validate: (formElement: EditorElementInstance, currentValue: string) => boolean;
};

export type EditorElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
}

type EditorElementsType = {
    [key in ElementsType]: EditorElement;
};

export const EditorElements: EditorElementsType = {
    TitleElement: TitleElement,
    ParagraphElement: ParagraphElement,
    SeparatorElement: SeparatorElement,
    TextElement: TextElement,
    NumberElement: NumberElement,
    PasswordElement: PasswordElement,
    UrlElement: UrlElement,
    EmailElement: EmailElement,
    PhoneElement: PhoneElement,
    TimeElement: TimeElement,
    DateElement: DateElement,
    FileElement: FileElement,
    TextAreaElement: TextAreaElement,
    RangeElement: RangeElement,
    RatingElement: RatingElement,
    PinElement: PinElement,
    ProgressElement: ProgressElement,
    SelectElement: SelectElement,
    CheckElement: CheckElement,
    RadioElement: RadioElement,
    ButtonElement: ButtonElement,
    CodeBlockElement: CodeBlockElement,
    LoaderElement: LoaderElement,
    JoystickElement: JoystickElement,
};