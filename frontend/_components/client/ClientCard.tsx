import { Mail, Phone, Calendar, Briefcase, Building, DollarSign } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { ClientActionMenu } from "./ClientActionMenu";
import { Client } from "../../types/client";

export function ClientCard({
    client,
    onEdit,
    onDelete
}: {
    client: Client;
    onEdit: (c: Client) => void;
    onDelete: (c: Client) => void;
}) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "VIP": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
            case "New Client": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative">
            <div className="absolute top-4 right-4">
                <ClientActionMenu client={client} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <div className="flex items-start gap-4 mb-5">
                <Avatar className="w-16 h-16 border-2 border-white dark:border-gray-800 shadow-sm bg-gray-50 dark:bg-gray-800">
                    <AvatarImage src={client.logoUrl} alt={client.companyName} className="object-contain p-1" />
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold text-lg">
                        {client.companyName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight group-hover:text-teal-600 transition-colors">{client.companyName}</h3>
                    <div className="flex items-center text-sm font-medium text-teal-600 dark:text-teal-500 mb-2 mt-0.5">
                        <Building className="w-3.5 h-3.5 mr-1" /> {client.industry}
                    </div>
                    <Badge variant="secondary" className={`font-medium ${getStatusColor(client.status)} border-0`}>
                        {client.status}
                    </Badge>
                </div>
            </div>

            <div className="space-y-2 mb-5">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {client.contactName}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2.5 shrink-0" />
                    <span className="truncate">{client.email}</span>
                </div>
                {client.phone && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2.5 shrink-0" />
                        <span>{client.phone}</span>
                    </div>
                )}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-[40px] border-t border-gray-100 dark:border-gray-800 pt-4">
                {client.description || "No description provided."}
            </p>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mt-auto">
                <div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-blue-500" />
                        <span className="text-xs font-medium uppercase tracking-wider">Projects</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{client.totalProjects}</p>
                </div>
                <div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-xs font-medium uppercase tracking-wider">Revenue</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">{formatCurrency(client.revenue)}</p>
                </div>
            </div>
        </div>
    );
}
