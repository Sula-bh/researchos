import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  children: React.ReactNode;
} & UseFormReturn<TFieldValues>;

function Form<TFieldValues extends FieldValues>({
  children,
  ...form
}: FormProps<TFieldValues>) {
  return <FormProvider {...form}>{children}</FormProvider>;
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);
const FormItemContext = React.createContext<{ id: string } | null>(null);

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = fieldContext
    ? getFieldState(fieldContext.name, formState)
    : undefined;
  const fieldError = fieldState?.error;

  return {
    id: itemContext?.id,
    name: fieldContext?.name,
    formItemId: `${itemContext?.id}-form-item`,
    formDescriptionId: `${itemContext?.id}-form-item-description`,
    formMessageId: `${itemContext?.id}-form-item-message`,
    fieldState,
    fieldError,
  };
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { fieldError, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!fieldError}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ children }: { children: React.ReactElement }) {
  const { fieldError, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !formDescriptionId && !fieldError
          ? undefined
          : `${formDescriptionId ?? ""} ${formMessageId ?? ""}`.trim()
      }
      aria-invalid={!!fieldError}
      data-slot="form-control"
    >
      {children}
    </Slot>
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { fieldError, formMessageId } = useFormField();
  const body = fieldError?.message;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};
export type { FormProps };
