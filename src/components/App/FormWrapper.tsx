type FormWrapperProps = {
    title: string
    children: React.ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps) {
    return (
        <>
            <h2 className=" m-0 mb-8 text-center">
                {title}
            </h2>
            <div className="grid gap-4 justify-start"
            >
                {children}
            </div>
        </>
    )
}