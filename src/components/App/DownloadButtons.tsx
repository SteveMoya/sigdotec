
export const DownloadDOC = ({ href }: { href: string }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <button
                type="button"
                className="px-4 py-3 bg-[#2B599A] hover:bg-secondary-900 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
            >
                <span className="icon-[mdi--arrow-collapse-down]"></span>
                <span className="mx-2">Descargar en .doc</span>
                <span className="icon-[mdi--microsoft-word]"></span>
            </button>
        </a>
    );
};

export const DownloadPDF = ({ href }: { href: string }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <button
                type="button"
                className="px-4 py-3 bg-[#F5160A] hover:bg-red-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
            >
                <span className="icon-[mdi--arrow-collapse-down]"></span>
                <span className="mx-2">Descargar en pdf</span>
                <span className="icon-[mdi--file-pdf-box]"></span>
            </button>
        </a>
    )
}