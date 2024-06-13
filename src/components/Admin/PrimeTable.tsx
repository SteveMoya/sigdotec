

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useFetch } from '@src/hooks/useFetch';
import { Image } from 'primereact/image';
import { useEffect } from 'react';
import { Loading } from '@components/App/Loading';

const PrimeTable = () => {
    const { data, isLoading, error, fetchData } = useFetch();
    // fetch data sin handleGetClick
    useEffect(() => {
        fetchData('https://rickandmortyapi.com/api/character', 'GET');
    }, []);
    const imageBodyTemplate = (character: { image: any; name: any; }) => {
        return <Image src={character.image} alt={character.name} width="100px" preview />
    }
    const colums = [
        { field: 'id', header: 'id' },
        { field: 'name', header: 'name' },
        { field: 'status', header: 'status' },
        { field: 'species', header: 'species' },
        { field: 'gender', header: 'gender'},

    ];

    const header = () => {
        return (
                <div className='flex justify-between'>
                    <div>
                        <h1>Usuarios</h1>
                    </div>
                </div>
        )
    }
    const footer = () => {
        return <div>Footer</div>
    }
    return (
        <div className='my-4 bg-slate-700 p-4 rounded'>
            {
                isLoading && <div className='w-[350px]'>Cargando<Loading /> </div>
            }
            {
                data && (
                    <DataTable sortField="name" dataKey="id" filterDisplay="row" removableSort sortOrder={-1} paginator rows={5} globalFilterFields={['id', 'name', 'status', 'species', 'gender']} rowsPerPageOptions={[5, 10, 25, 50]} header={header} stripedRows footer={footer} value={data.results} emptyMessage="No se encontraros usuarios." tableStyle={{ minWidth: '60rem' }}>
                        <Column field="image" header="image" body={imageBodyTemplate} className='m-5 rounded-3xl '></Column>
                        {colums.map((colum, index) => (
                            <Column sortable key={index} field={colum.field} header={colum.header}  />
                        ))}
                    </DataTable>
                )
            }
            {
                error && <div>{error.message}</div>
            }
        </div>
    )
}

export default PrimeTable