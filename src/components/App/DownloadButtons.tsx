
export const DownloadDOC = () => {
    const download = async () => {
        try {
            const res = await fetch("/api/ai/download/download-word",{
                method: "POST",
            });
            if (!res.ok) {
                throw new Error('Error downloading the document');
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `plan.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            console.error(error);
        }
    }
    return (
            <button onClick={download}
                type="button"
                className="px-4 py-3 bg-[#2B599A] hover:bg-secondary-900 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
            >
                <span className="icon-[mdi--arrow-collapse-down]"></span>
                <span className="mx-2">Descargar en DOC</span>
                <span className="icon-[mdi--microsoft-word]"></span>
            </button>
    );
};

export const DownloadPDF = () => {
    const download = async () => {
        try {
            const res = await fetch("/api/ai/download/download-pdf", {
                method: "POST",
            });
            if (!res.ok) {
                throw new Error('Error downloading the document');
            }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `plan.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error(error);
        }
    }
    return (
            <button onClick={download}
                type="button"
                className="px-4 py-3 bg-[#F5160A] hover:bg-red-700 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex items-center"
            >
                <span className="icon-[mdi--arrow-collapse-down]"></span>
                <span className="mx-2">Descargar en PDF</span>
                <span className="icon-[mdi--file-pdf-box]"></span>
            </button>
    )
}