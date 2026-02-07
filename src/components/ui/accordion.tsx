"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
}>({});

const AccordionItemContext = React.createContext<{ value: string }>({ value: "" });

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple";
        collapsible?: boolean;
        defaultValue?: string;
        value?: string;
        onValueChange?: (value: string) => void;
    }
>(({ className, children, type = "single", value: controlledValue, onValueChange, defaultValue, collapsible, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue || (type === "single" ? "" : []));

    // Handle collapsible logic
    const isCollapsible = type === "single" ? collapsible : true;

    const handleValueChange = (itemValue: string) => {
        if (type === "single") {
            const newValue = (isCollapsible && itemValue === value) ? "" : itemValue;
            setValue(newValue);
            onValueChange?.(newValue);
        }
    };

    return (
        <AccordionContext.Provider value={{ value: controlledValue || (value as string), onValueChange: handleValueChange }}>
            <div ref={ref} className={cn("", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
});
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <AccordionItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props}>
            {children}
        </div>
    </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(AccordionContext);

    return (
        <AccordionItemContext.Consumer>
            {(itemContext) => (
                <button
                    ref={ref}
                    onClick={() => onValueChange?.(itemContext.value)}
                    className={cn(
                        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                        className
                    )}
                    data-state={value === itemContext.value ? "open" : "closed"}
                    {...props}
                >
                    {children}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </button>
            )}
        </AccordionItemContext.Consumer>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { value } = React.useContext(AccordionContext);
    return (
        <AccordionItemContext.Consumer>
            {(itemContext) => (
                <AnimatePresence initial={false}>
                    {value === itemContext.value && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className={cn("pb-4 pt-0", className)} ref={ref} {...props}>
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </AccordionItemContext.Consumer>
    );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
