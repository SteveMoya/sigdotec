const DataDisplay = ({ data }) => {
    if(!data) return <p>No hay datos</p>;
    return (
        <>
            {Object.entries(data).map(([key, value]) => (
                <div className='p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:border-gray-700 sm:p-6 dark:bg-gray-800 font-black' key={key}>
                    <h2 className='px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 uppercase'>
                        {key.slice(0).replace(/_/g, ' ')}
                    </h2><hr />
                    <p className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 font-semibold">
                        {Array.isArray(value) ? (
                            <ul>
                                {value.map((item) => (
                                    <li key={item.toString()}>-{item}.</li>
                                ))}
                            </ul>
                        ) : (
                            value.toString()
                        )}
                    </p>
                </div>
            ))}
        </>
    );
};

export default DataDisplay;