const DataCard = ({ key, value }) => {
    return (
        <div className='p-4 mb-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-2xl dark:border-gray-700 sm:p-6 dark:bg-gray-800 font-black' key={key}>
            <h2 className='px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 uppercase'>{key}</h2><hr />
            <p className='px-4 py-2 text-gray-400 border border-gray-200 border-dashed rounded dark:border-gray-600 font-semibold'>{value as React.ReactNode}</p>
        </div>
    );
};

export default DataCard;