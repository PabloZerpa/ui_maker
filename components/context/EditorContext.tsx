"use client";

import { EditorElementInstance } from "@/components/EditorElements";
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type DeviceTypes = 'Desktop' | 'Mobile' | 'Tablet';
export type EditorAction =
  {
    type: 'CHANGE_DEVICE'
    payload: { device: DeviceTypes }
  } | { type: 'REDO' } | { type: 'UNDO' }

type DesignerContextType = {
  elements: EditorElementInstance[];

  setElements: Dispatch<SetStateAction<EditorElementInstance[]>>;
  addElement: (index: number, element: EditorElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: EditorElementInstance) => void;

  selectedElement: EditorElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<EditorElementInstance | null>>;

  selectedSize: string | null;
  setSelectedSize: Dispatch<SetStateAction<string | null>>;
  changeSize: (type: string) => void;

  isGrid: boolean | null;
  setIsGrid: Dispatch<SetStateAction<boolean | null>>;
  changeIsGrid: (grid: boolean) => void;

  gap: number | null;
  setGap: Dispatch<SetStateAction<number | null>>;
  changeGap: (gap: number) => void;

  cols: number | null;
  setCols: Dispatch<SetStateAction<number | null>>;
  changeCols: (col: number) => void;

  rows: number | null;
  setRows: Dispatch<SetStateAction<number | null>>;
  changeRows: (row: number) => void;

  direction: boolean | null;
  setDirection: Dispatch<SetStateAction<boolean | null>>;
  changeDirection: (dir: boolean) => void;

  justify: string | null;
  setJustify: Dispatch<SetStateAction<string | null>>;
  changeJustify: (justify: string) => void;

  align: string | null;
  setAlign: Dispatch<SetStateAction<string | null>>;
  changeAlign: (align: string) => void;

  code: string;
  setCode: Dispatch<SetStateAction<string>>;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<EditorElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<EditorElementInstance | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>('Desktop');
  const [code, setCode] = useState<string>('');

  const [isGrid, setIsGrid] = useState<boolean | null>(true);
  const [gap, setGap] = useState<number | null>(4);
  const [cols, setCols] = useState<number | null>(1);
  const [rows, setRows] = useState<number | null>(1);
  const [direction, setDirection] = useState<boolean | null>(true);
  const [justify, setJustify] = useState<string | null>('start');
  const [align, setAlign] = useState<string | null>('start');

  // ========== ADD ELEMENT TO THE CANVAS FUNCTION ==========
  const addElement = (index: number, element: EditorElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  // ========== REMOVE ELEMENT TO THE CANVAS FUNCTION ==========
  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  // ========== UPDATE ELEMENT TO THE CANVAS FUNCTION ==========
  const updateElement = (id: string, element: EditorElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeIsGrid = (isGrid: boolean) => {
    setIsGrid(isGrid);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeSize = (type: string) => {
    setSelectedSize(type);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeGap = (gap: number) => {
    setGap(gap);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeCols = (col: number) => {
    setCols(col);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeRows = (row: number) => {
    setRows(row);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeDirection = (dir: boolean) => {
    setDirection(dir);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeJustify = (justify: string) => {
    console.log('JUSTIFY');
    setJustify(justify);
  };

  // ========== CHANGE SIZE OF THE CANVAS FUNCTION ==========
  const changeAlign = (align: string) => {
    console.log('ALIGN');
    setAlign(align);
  };


  return (
    <DesignerContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
        selectedSize,
        setSelectedSize,
        changeSize,

        isGrid,
        setIsGrid,
        changeIsGrid,

        gap,
        setGap,
        changeGap,

        cols,
        setCols,
        changeCols,
        rows,
        setRows,
        changeRows,

        direction,
        setDirection,
        changeDirection,
        justify,
        setJustify,
        changeJustify,
        align,
        setAlign,
        changeAlign,

        code,
        setCode,
      }}
    >
      {children}
    </DesignerContext.Provider>
  );
}