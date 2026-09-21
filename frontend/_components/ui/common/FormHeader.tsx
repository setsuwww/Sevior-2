interface FormHeaderProps {
    title: string;
    description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
    return (
        <div>
            <h2 className="text-base font-semibold text-gray-700">
                {title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                {description}
            </p>
        </div>
    )
}
