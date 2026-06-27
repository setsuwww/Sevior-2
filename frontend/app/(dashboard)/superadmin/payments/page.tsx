"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Filter, CreditCard, DollarSign, ArrowUpRight } from "lucide-react";
import { superadminPaymentsService, Subscription, PaymentStats } from "@/_lib/services/superadmin/payments.service";
import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_components/ui/table";

export default function SuperAdminPaymentsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const [subsRes, statsRes] = await Promise.all([
        superadminPaymentsService.getSubscriptions({ page, limit: 10 }),
        superadminPaymentsService.getStats()
      ]);
      setSubscriptions(subsRes.data || []);
      setTotal(subsRes.total || 0);
      setStats(statsRes);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPayments(); // Need to implement search in backend if needed
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status.toUpperCase()) {
      case "ACTIVE": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PAST_DUE": return "bg-red-50 text-red-700 border-red-200";
      case "CANCELLED": return "bg-gray-50 text-gray-700 border-gray-200";
      default: return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Billing & Subscriptions
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage agency subscriptions, billing history, and platform revenue.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Monthly Recurring Revenue</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">${stats?.monthly_revenue?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>

        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Total Lifetime Processed</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">${stats?.total_paid?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>

        <div className="relative group p-[1px] rounded-2xl bg-gradient-to-b from-gray-200 to-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="relative h-full bg-white p-6 rounded-[15px]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center border border-yellow-100">
                <ArrowUpRight className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Pending Revenue</p>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">${stats?.pending_revenue?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="font-bold text-gray-900">Active Subscriptions</div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Button variant="outline" className="rounded-xl border-gray-200 text-gray-600 w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/80">
              <TableRow className="border-gray-100 hover:bg-transparent">
                <TableHead className="font-semibold text-gray-600">Agency</TableHead>
                <TableHead className="font-semibold text-gray-600">Plan</TableHead>
                <TableHead className="font-semibold text-gray-600">Amount</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600">Billing Period</TableHead>
                <TableHead className="font-semibold text-gray-600 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-500 font-medium">Loading...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : subscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
                      <CreditCard className="w-8 h-8 text-gray-300" />
                      <p className="font-medium text-sm">No subscriptions found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                subscriptions.map((s) => (
                  <TableRow key={s.id} className="group border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <span className="text-sm font-bold text-gray-900">{s.agency?.name || 'Unknown'}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-700">{s.plan}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-700">${s.price.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${getStatusBadgeColor(s.status)}`}>
                        {s.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-medium text-gray-500">
                        {new Date(s.start_date).toLocaleDateString()} - {new Date(s.end_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-teal-600 font-semibold hover:bg-teal-50 hover:text-teal-700">
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && subscriptions.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
            <p className="text-xs font-medium text-gray-500">
              Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total} results
            </p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 rounded-lg"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 rounded-lg"
                disabled={page * 10 >= total}
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
