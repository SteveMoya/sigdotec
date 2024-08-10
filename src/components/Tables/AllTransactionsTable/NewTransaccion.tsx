import { PaymentForm } from "@/components/Payment/PaymetForm"
import {Button} from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewTransactionSchema, typesTransaction } from "@/schemas";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react";

export const NewTransaccion = () => {
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(NewTransactionSchema),
        defaultValues: {
            transactionid: "",
            email: "",
            amount: 0,
            type: "",
            createdAt: new Date(),
            onConfirm: false,
        },
    });

    async function onConfirm() {
        try{
            const values = form.getValues()
            console.log(values)
            const res = await fetch(`/api/pay/create-transaction`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
            if (!res.ok) toast.error("Error al crear la transaccion");
            form.reset()
            setOpen(false)
            toast.success("Transaccion creada con exito")

        }catch(e){
            console.log(e)
            toast.error("Error al crear la transaccion")
        }
    }
    async function onSubmit() {
        setOpen(true)
    }
  return (
    <>
          <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                  <AlertDialogHeader>
                      <AlertDialogTitle>Confirmacion de los datos</AlertDialogTitle>
                      <AlertDialogDescription>
                          Estos son los datos que ingresaste, ¿estas seguro de que son correctos?
                          <div className="flex items-center space-x-2 my-4 flex-col gap-2">
                            {/** Aqui mostramos todos los datos ingresados */}
                              <div className="grid grid-cols-2 gap-x-8">
                                  {Object.entries(form.getValues()).map(([key, value]) => {
                                      // Si key es 'onConfirm', no mostramos nada
                                      if (key === 'onConfirm') {
                                          return null;
                                      }

                                      // Si value es de tipo Date, formateamos la fecha
                                      const formattedValue = value instanceof Date ? value.toLocaleDateString() : String(value);

                                      return (
                                          <>
                                              <span key={key} className="font-semibold">{key}:</span>
                                              <span>{formattedValue}</span>
                                          </>
                                      );
                                  })}
                              </div>

                            <div className="flex items-center gap-2">
                                <Checkbox onCheckedChange={(value: boolean) => {
                                    form.setValue("onConfirm", value)
                                }} id="confirm" />
                                <label
                                    htmlFor="confirm"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Aceptar los datos ingresados
                                </label>
                            </div>
                          </div>
                      </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={onConfirm}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
              </AlertDialogContent>
          </AlertDialog>

      <Dialog>
          <DialogTrigger asChild >
              <Button variant="outline" className="ml-auto mb-4 sm:mb-0 mr-4 inline-flex items-center bg-white border border-primary-300 focus:outline-none hover:bg-primary-100 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-primary-700 text-white dark:hover:bg-primary-800"><span className="icon-[mdi--wallet-plus] mr-2"></span> Agregar </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Nueva Transaccion</DialogTitle>
                  <DialogDescription>
                      Crea una nueva transaccion
                  </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                          control={form.control}
                          name="transactionid"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel className="font-semibold text-lg">Id de la transaccion</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Ingresa el Id de la transaccion" {...field} type="text" />
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />   
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold text-lg">Correo del Usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa el correo del Usuario" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-lg">Monto</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingresa el Monto aquí..." 
                                            //Colocamos que el valor de este input se convierta a un numero
                                            {...field}
                                            type="number" min="1" max="500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                      <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                              <FormItem >
                                  <FormLabel className="font-semibold text-lg">Tipo de Transaccion</FormLabel>
                                  <FormControl>
                                      <Select onValueChange={field.onChange}>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Selecciona el tipo de transaccion..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                              {typesTransaction.map((i) => (
                                                  <SelectItem value={i} key={i}>
                                                      {i}
                                                  </SelectItem>
                                              )
                                              )}
                                          </SelectContent>
                                      </Select>
                                  </FormControl>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="createdAt"
                          render={({ field }) => (
                              <FormItem >
                                  <FormLabel className="font-semibold text-lg">Fecha de creacion</FormLabel>
                                  <Popover>
                                      <PopoverTrigger asChild>
                                          <FormControl>
                                              <Button
                                                  variant={"outline"}
                                                  className={cn(
                                                      " pl-3 text-left font-normal w-full",
                                                      !field.value && "text-muted-foreground"
                                                  )}
                                              >
                                                  {field.value ? (

                                                      format(field.value, "dd/MM/yyyy")
                                                  ) : (
                                                      <span>Selecciona la fecha</span>
                                                  )}
                                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                              </Button>
                                          </FormControl>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0" align="start">
                                          <Calendar
                                              mode="single"
                                              selected={field.value}
                                              onSelect={field.onChange}
                                              disabled={(date: Date) =>
                                                  date > new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                                                   || date < new Date("2024-01-01")
                                              }
                                              initialFocus
                                              lang="es-ES"
                                          />
                                      </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                              </FormItem>
                          )}
                      />{" "}
                      <Button type="submit" className="w-full  hover:bg-primary-800 dark:hover:bg-primary-800 hover:text-white dark:hover:text-white mt-4">Confirmar</Button>
              </form>
              </Form>

          </DialogContent>
      </Dialog>
    </>
  )
}
