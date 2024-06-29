
import { useFetch } from '@hooks/useFetch';
import { Loading } from './Loading';

import DataDisplay from './DataDisplay';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { DownloadDOC } from './DownloadButtons';
import { toast } from 'sonner';
export const UnitPlan = () => {
    const { data, isLoading, error, fetchData } = useFetch();
    const { data: data2, error: error2, fetchData: fetchData2 } = useFetch();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm(
        {defaultValues: {
            unidades: '',
        }}
    )
    type Inputs = {
        unidades: string;
    }

    useEffect(() => {
        fetchData2(`/api/ai/alltopic`, 'GET');
    }, [])


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        fetchData(`/api/ai/unitplan?topic_id=${data.unidades}`, 'GET')
    }
    useEffect(() => {
      if(error) toast.error('Error al generar el plan de unidad')
        if(data) toast.success('Plan de unidad generado correctamente')
        if(isLoading) toast.loading('Cargando temas')
        return () => {
            toast.dismiss()
        }
    }, [data, error, isLoading])
    return (
        <section>
            <div className='text-center mx-0 '>
                <h2 className='my-4 text-2xl font-bold'> Plan de Unidad</h2>
                {error2 && <p className='text-danger-700'>Error: {error2.message}</p>}
                <p className='mb-4'>Seleciona el tema de tu plan </p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 my-4 text-black'>
                    <select {...register("unidades", {
                        required: { value: true, message: 'Unidad requerida' }
                    })}>
                        <option value=''>Selecciona una unidad</option>
                        {data2 && Object.entries(data2).map(([key, value]) => {
                            return (
                                <option key={key} value={key}>{value[0]}</option>
                            )})
                        }
                    </select>
                    {errors.unidades && <span className='text-danger-700'>{errors.unidades.message}</span>}
                    {error && <p className='text-danger-700'>Error: {error.message}</p>}
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'>Buscar el plan </button>
                </form>
                {/*Colocar un toast de loading, de success y de error */}
                {isLoading && (<Loading />
                )}
            </div>
            {data &&
                <>
                    <article className='mx-0 text-center p-7 grid sm:grid-cols-3 grid-cols-1 gap-4'>
                    <DataDisplay data={data} />  
                </article>
                    <div className="flex justify-center items-center">
                    <DownloadDOC href='/src/mocks/Plan de unidad.docx' />
                    
                    </div>
                </>
            }
        </section>
    );
};

