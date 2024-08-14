import {Button} from "@/components/ui/button"
import { DialogDescription, DialogHeader, DialogTitle, Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { NewUserSchema, roles } from "@/schemas";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState } from "react";

export const NewUser = () => {
    const [open, setOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(NewUserSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "",
            balance: "",
            onConfirm: false,
        },
    });

    async function onConfirm() {
        try{
            const values = form.getValues()
            console.log(values)
            const res = await fetch(`/api/auth/create-user`, {
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
              <Button variant="outline" className="ml-auto mb-4 sm:mb-0 mr-4 inline-flex items-center  border border-primary-300 focus:outline-none  focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-4 py-2.5 bg-primary-700 hover:bg-primary-800"><span className="icon-[mdi--user-add] mr-2"></span> Crear </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
              <DialogHeader>
                  <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                  <DialogDescription>
                      Crea un nuevo usuario en la base de datos
                  </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                              <FormItem>
                                  <FormLabel className="font-semibold text-lg">Nombre del Usuario</FormLabel>
                                  <FormControl>
                                      <Input placeholder="Ingresa el nombre del usuario" {...field} type="text" />
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
                                    <FormLabel className="font-semibold text-lg">Email del Usuario</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa el Email del Usuario" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel className="font-semibold text-lg">Contraseña del Usuario</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Ingresa el Email del Usuario" {...field} type="password" />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                              <FormItem >
                                  <FormLabel className="font-semibold text-lg">Rol del Usuario</FormLabel>
                                  <FormControl>
                                      <Select onValueChange={field.onChange}>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Selecciona el tipo de transaccion..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                              {roles.map((i) => (
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
                              name="balance"
                              render={({ field }) => (
                                  <FormItem>
                                      <FormLabel className="font-semibold text-lg">Balance (USD)</FormLabel>
                                      <FormControl>
                                          <Input placeholder="Ingresa el Monto aquí..."
                                              //Colocamos que el valor de este input se convierta a un numero
                                              {...field}
                                              type="number" min="0" max="500" />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                              )}
                          />
                      <Button type="submit" className="w-full  hover:bg-primary-800 hover:text-white mt-4">Confirmar</Button>
              </form>
              </Form>
          </DialogContent>
      </Dialog>
    </>
  )
}
