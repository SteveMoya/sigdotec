
import { useFetch } from '@hooks/useFetch';
import { Loading } from './Loading';
// import DataDisplay from './DataDisplay';
import allTopicMock from "@mocks/allDataMock.json"
import { DownloadDOC } from './DownloadButtons';

export const AllTopic = () => {
    const { data, isLoading, error, fetchData } = useFetch();
    // const data = allTopicMock;
    

    const handleClick = () => {
        fetchData(`/api/ai/alltopic`, 'GET');
    }
    return (
        <section>
            <div className='text-center mx-0 '>
                <h2 className='my-4 text-2xl font-bold'> Todos los temas</h2>
                {error && <p>Error: {error.message}</p>}
                <p className='mb-4'>Selecciona el botón para obtener todos los temas</p>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center'
                onClick={handleClick}>Buscar todos los temas </button>
                {isLoading && (<Loading />
                )}
            </div>
            {data &&
                <>
                    <article className='mx-0 text-center p-7 grid sm:grid-cols-3 grid-cols-1 gap-4'>
                        {
                            Object.entries(data).map(([key, value]) => {
                                return (
                                    <div key={key} className='bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg'>
                                        <h2 className='text-lg font-bold'>{String(key)}</h2>
                                        <h3 className='text-lg font-bold'>{String(value[0])}</h3>
                                        <p className='text-sm font-semibold'>{value[1][1]}</p>
                                        <p className='text-sm font-semibold'>{value[2][1]}</p>
                                        <ul className='text-sm font-semibold'>
                                            {Object.entries(value[3]).map(([key, value]) => {
                                                return (
                                                    <li key={key}>{value as React.ReactNode}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </article>
                    <div className="flex justify-center items-center">
                    <DownloadDOC />
                    
                    </div>
                </>
            }
        </section>
    );
};

