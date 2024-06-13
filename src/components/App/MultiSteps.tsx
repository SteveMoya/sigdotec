import { useState } from "react"
import { AccountForm } from "./AccountForm"
import {AddressForm} from "./AdressForm"
import { useMultistepForm } from "@hooks/useMultiStep"
import { UserForm } from "./UseForm"

type FormData = {
  firstName: string
  lastName: string
  age: string
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function MultiSteps() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Creacion de cuenta exitosa!")
  }

  return (
    <div className="relative bg-slate-700 border p-8 m-4 rounded-lg font-sans max-w-max"
    >
      <form onSubmit={onSubmit}>
        <div className="absolute top-2 right-2">
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className="flex justify-end gap-2 mt-4"
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}

export default MultiSteps