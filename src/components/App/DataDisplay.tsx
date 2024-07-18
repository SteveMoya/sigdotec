const DataDisplay = ({ data }) => {
    if (!data) return <p>No hay datos</p>;

    const renderValue = (value) => {
        if (Array.isArray(value)) {
            return (
                <ul>
                    {value.map((item, index) => (
                        <li key={index.toString()}>-{item}.</li>
                    ))}
                </ul>
            );
        } else if (typeof value === 'object' && value !== null) {
            return (
                <div className="ml-4">
                    {Object.entries(value).map(([subKey, subValue]) => (
                        <div key={subKey}>
                            <h3 className="text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 uppercase my-2">
                                {mapKey(subKey)}
                            </h3>
                            <p className="ml-4">{renderValue(subValue)}</p>
                        </div>
                    ))}
                </div>
            );
        } else {
            return value.toString();
        }
    };

    const mapKey = (key) => {
        const keyMap = {
            p_i: "Actividades de enseñanza - Introducción",
            p_d: "Actividades de enseñanza - Desarrollo",
            p_c: "Actividades de enseñanza - Cierre",
            e_i: "Actividades de aprendizaje - Introducción",
            e_d: "Actividades de aprendizaje - Desarrollo",
            e_c: "Actividades de aprendizaje - Cierre"
        };
        return keyMap[key] || key.slice(0).replace(/_/g, ' ');
    };

    return (
        <>
            {Object.entries(data).map(([key, value]) => (
                <div className='p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:border-gray-700 sm:p-6 dark:bg-gray-800 font-black' key={key}>
                    <h2 className='px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 uppercase'>
                        {mapKey(key)}
                    </h2>
                    <hr />
                    <p className="px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 font-semibold">
                        {renderValue(value)}
                    </p>
                </div>
            ))}
        </>
    );
};

export default DataDisplay;
