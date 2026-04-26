"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

const PIN = process.env.NEXT_PUBLIC_PIN_PIZARRA ?? "2026"
const SESSION_KEY = "pizarra_auth"

interface PinGateProps {
  open: boolean
  onUnlock: () => void
  onClose: () => void
}

export function PinGate({ open, onUnlock, onClose }: PinGateProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) {
      setValue("")
      setError(false)
    }
  }, [open])

  const handleChange = (v: string) => {
    setError(false)
    setValue(v)
    if (v.length === 4) {
      if (v === PIN) {
        sessionStorage.setItem(SESSION_KEY, "1")
        setTimeout(onUnlock, 150)
      } else {
        setError(true)
        setTimeout(() => {
          setValue("")
          setError(false)
        }, 700)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-xs">
        <DialogTitle className="text-center text-lg">La Pizarra</DialogTitle>
        <DialogDescription className="text-center">
          Ingresá el PIN para agregar recetas
        </DialogDescription>
        <div className="flex flex-col items-center gap-3 py-2">
          <InputOTP
            maxLength={4}
            value={value}
            onChange={handleChange}
            inputMode="numeric"
            autoFocus
          >
            <InputOTPGroup>
              {[0, 1, 2, 3].map(i => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className={error ? "border-destructive text-destructive" : ""}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-sm text-destructive">PIN incorrecto, intentá de nuevo</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function isPizarraUnlocked(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem(SESSION_KEY) === "1"
}
