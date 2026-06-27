"use client";

import { useEffect, useState, useCallback } from "react";
import { AlertCircle, Terminal, Megaphone, CheckCircle2, ShieldAlert } from "lucide-react";
import { superadminSettingsService, ActivityLog, Announcement } from "@/_lib/services/superadmin/settings.service";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";

export default function SuperAdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingMode, setSavingMode] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const [maintenance, logsRes, annRes] = await Promise.all([
        superadminSettingsService.getMaintenanceMode(),
        superadminSettingsService.getAuditLogs({ page: 1, limit: 10 }),
        superadminSettingsService.getAnnouncements({ page: 1, limit: 10 })
      ]);
      setMaintenanceMode(maintenance);
      setLogs(logsRes.data || []);
      setAnnouncements(annRes.data || []);
    } catch (error) {
      console.error("Failed to fetch settings", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const toggleMaintenance = async () => {
    try {
      setSavingMode(true);
      const newState = !maintenanceMode;
      await superadminSettingsService.toggleMaintenanceMode(newState);
      setMaintenanceMode(newState);
    } catch (error) {
      console.error("Failed to toggle maintenance", error);
    } finally {
      setSavingMode(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Platform Settings
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl">
          Global configuration, maintenance controls, platform announcements, and system audit logs.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        
        <div className="space-y-6">
          {/* Maintenance Mode Card */}
          <Card className={`border-2 transition-colors duration-500 ${maintenanceMode ? 'border-red-200 bg-red-50/50' : 'border-gray-200 bg-white'}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${maintenanceMode ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                    {maintenanceMode ? <ShieldAlert className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-sm">
                      When enabled, the platform will be inaccessible to all users except Super Admins. Use this during major deployments or database migrations.
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={toggleMaintenance}
                  disabled={savingMode}
                  className={`${maintenanceMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'} shadow-sm`}
                >
                  {savingMode ? "Applying..." : maintenanceMode ? "Disable Maintenance" : "Enable Maintenance"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Announcements Card */}
          <Card className="border-gray-200 bg-white shadow-sm">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-900 font-bold">
                <Megaphone className="w-5 h-5 text-teal-600" />
                <h3>Platform Announcements</h3>
              </div>
              <Button size="sm" variant="outline" className="h-8">New Announcement</Button>
            </div>
            <CardContent className="p-0">
              {announcements.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500">No active announcements.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {announcements.map(ann => (
                    <li key={ann.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{ann.title}</h4>
                        <span className="text-[10px] uppercase font-bold text-gray-400">
                          {new Date(ann.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{ann.content}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Audit Logs */}
        <Card className="border-gray-200 bg-gray-900 shadow-xl overflow-hidden text-gray-300">
          <div className="p-4 border-b border-gray-800 bg-black/40 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-sm text-emerald-500">
              <Terminal className="w-4 h-4" />
              <span>system_audit_logs.json</span>
            </div>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-4 font-mono text-xs space-y-3 custom-scrollbar">
              {logs.length === 0 ? (
                <div className="text-gray-500 italic">No audit logs recorded yet.</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="bg-black/20 p-3 rounded border border-gray-800/50 hover:border-gray-700 transition-colors">
                    <div className="flex text-gray-400 mb-1">
                      <span className="text-purple-400 w-32 shrink-0">[{new Date(log.created_at).toISOString()}]</span>
                      <span className="text-blue-400">USER_{log.user_id}</span>
                      <span className="mx-2">-&gt;</span>
                      <span className="text-emerald-400 font-bold">{log.action}</span>
                    </div>
                    <div className="pl-36 text-gray-300">
                      <span className="text-gray-500">Details: </span>
                      {log.details}
                    </div>
                    {log.ip_address && (
                      <div className="pl-36 text-gray-500 mt-1">
                        IP: {log.ip_address}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
