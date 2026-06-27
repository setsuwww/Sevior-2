export default function ClientDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    Client Dashboard
                </h1>
                <p className="text-gray-500 text-base max-w-2xl">
                    Welcome to your client portal. Track your project progress and invoices here.
                </p>
            </div>
            {/* Add client specific widgets here */}
        </div>
    );
}
