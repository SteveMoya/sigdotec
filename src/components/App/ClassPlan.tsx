
import { useFetch } from '@hooks/useFetch';
import { Loading } from './Loading';
import { toast } from 'sonner'


import classplanmock from '@mocks/classplan.json';

import DataDisplay from './DataDisplay';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { DownloadDOC } from './DownloadButtons';
import { useEffect } from 'react';
export const ClassPlan = () => {
    const { data, isLoading, error, fetchData } = useFetch();
    // const data = classplanmock;
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm(
        {
            defaultValues: {
                classplan: ''
            }
        }
    )
    type Inputs = {
        classplan: string
    }
    const onSubmit: SubmitHandler<Inputs> = (data) => {fetchData(`/api/ai/classplan`, 'POST', data.classplan)
    }
    useEffect(() => {
        if (error) toast.error('Error al generar el plan de unidad')
        if (data) toast.success('Plan de unidad generado correctamente')
        if (isLoading) toast.loading('Cargando temas')
        return () => {
            toast.dismiss()
        }
    }, [data, error, isLoading])
    return (
        <section>
            
            <div className='text-center mx-0 '>
                <h2 className='my-4 text-2xl font-bold'> Plan de Clase</h2>
                {error && <p>Error: {error.message}</p>}
                <p className='mb-4'>Selecciona el botón para obtener tu Plan de Clase</p>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 my-4 text-black'>
                    <input type='text' className='rounded' {...register("classplan", {
                        required: { value: true, message: 'Numero requerido' },
                        min: { value: 0, message: 'Tienes que ser por lo menos de 1' },
                        max: { value: 60, message: 'El maximo de planes es 60' },
                        // pattern: { value: /^[0-9]*$/, message: 'Solo numeros' },
                    })} />
                    {errors.classplan && <span className='text-danger-700 '>{errors.classplan.message}</span>}

                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'>Buscar el plan </button>
                </form>
                {isLoading && (<Loading />
                )}
            </div>
            {data &&
                <>
                    <article className='mx-0 text-center p-7 grid sm:grid-cols-2 grid-cols-1 gap-4'>
                        <DataDisplay data={data} />
                    </article>
                    <div className="flex justify-center items-center">
                    <DownloadDOC href='@mock/Plan de clase.docx' />
                    
                    </div>
                </>
            }
        </section>
    );
};

