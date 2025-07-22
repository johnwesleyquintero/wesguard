import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ValidatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  id: string;
}

interface ValidatedTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  id: string;
}

type CombinedValidatedInputProps = (
  | ValidatedInputProps
  | ValidatedTextAreaProps
) & {
  isTextArea?: boolean;
};

const ValidatedInput: React.FC<CombinedValidatedInputProps> = ({
  label,
  error,
  id,
  isTextArea = false,
  className,
  ...props
}) => {
  const errorId = error ? `${id}-error` : undefined;

  const commonProps = {
    id,
    className: cn(
      error && "border-destructive focus-visible:ring-destructive",
      className,
    ),
    "aria-invalid": !!error,
    "aria-describedby": errorId,
    ...props,
  };

  return (
    <div className="grid w-full items-center gap-1.5 mb-4">
      {label && <Label htmlFor={id}>{label}</Label>}
      {isTextArea ? (
        <Textarea
          {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <Input
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default ValidatedInput;
