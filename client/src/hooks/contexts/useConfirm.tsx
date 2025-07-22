// context/ConfirmContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type ConfirmOptions = {
  title?: string;
  content: string;
};

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
};

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ content: "" });
  const [resolveFn, setResolveFn] = useState<(val: boolean) => void>(
    () => () => {}
  );

  const confirm = (options: ConfirmOptions) => {
    setOptions(options);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolveFn(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOpen(false);
    resolveFn(result);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>{options.title || "Xác nhận"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{options.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Hủy</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmContext.Provider>
  );
};
