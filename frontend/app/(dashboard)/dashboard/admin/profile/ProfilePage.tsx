"use client";

import { fetchUserProfile, UserProfile } from "@/_lib/services/admin/profile.service";
import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Building2,
    MapPin,
    Globe,
    Edit3,
    Key,
    LogOut,
    Trash2,
    Camera,
    Shield,
    CheckCircle,
    XCircle
} from "lucide-react";

export function AdminProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({
        fullName: '',
        email: '',
        agencyName: '',
        description: '',
        location: '',
        website: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setProfile(data);
                setEditForm({
                    fullName: data.FullName || '',
                    email: data.Email || '',
                    agencyName: data.Agency?.AgencyName || '',
                    description: data.Agency?.Description || '',
                    location: data.Agency?.Location || '',
                    website: data.Agency?.Website || ''
                });
            }
            catch (error) { console.log("Failed to fetch profile:", error) }
            finally { setLoading(false) }
        };

        loadProfile();
    }, []);

    const handleEditProfile = async () => {
        try {
            // API call to update profile
            setSuccessMessage('Profile updated successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            setActiveModal(null);
        } catch (error) {
            setErrorMessage('Failed to update profile');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }
        try {
            // API call to change password
            setSuccessMessage('Password changed successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            setActiveModal(null);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setErrorMessage('Failed to change password');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    const handleLogout = async () => {
        try {
            // API call to logout
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            // API call to delete account
            window.location.href = '/goodbye';
        } catch (error) {
            console.error('Delete account failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700">Profile Not Found</h2>
                    <p className="text-gray-500 mt-2">Unable to load profile information</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Success/Error Messages */}
            {successMessage && (
                <div className="fixed top-4 right-4 z-50 animate-slide-down">
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <p className="text-green-700">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="fixed top-4 right-4 z-50 animate-slide-down">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
                        <div className="flex items-center">
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            <p className="text-red-700">{errorMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Cover Image */}
                    <div className="h-48 bg-gradient-to-r from-slate-800 to-teal-800 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative">
                                <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-br from-slate-600 to-teal-600 flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">
                                            {profile.FullName?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 border-2 border-white hover:bg-blue-700 transition-colors"
                                    onClick={() => setActiveModal('photo')}
                                >
                                    <Camera className="h-4 w-4 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{profile.FullName}</h1>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <Mail className="h-4 w-4 mr-2" />
                                    {profile.Email}
                                </p>
                                <p className="text-gray-600 flex items-center mt-1">
                                    <User className="h-4 w-4 mr-2" />
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveModal('edit')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit3 className="h-4 w-4" />
                                Edit Profile
                            </button>
                        </div>

                        {/* Agency Info */}
                        {profile.Agency ? (
                            <div className="mt-8 bg-gray-50 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 className="h-6 w-6 text-blue-600" />
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {profile.Agency.AgencyName}
                                    </h2>
                                </div>
                                {profile.Agency.Description && (
                                    <p className="text-gray-700 mb-4">{profile.Agency.Description}</p>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.Agency.Location && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>{profile.Agency.Location}</span>
                                        </div>
                                    )}
                                    {profile.Agency.Website && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Globe className="h-4 w-4" />
                                            <a href={profile.Agency.Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {profile.Agency.Website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                                <p className="text-yellow-700">You are not associated with an agency.</p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-wrap gap-4 border-t pt-6">
                            <button
                                onClick={() => setActiveModal('password')}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Key className="h-4 w-4" />
                                Change Password
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {activeModal === 'edit' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fullName}
                                        onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {profile.Agency && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                                            <input
                                                type="text"
                                                value={editForm.agencyName}
                                                onChange={(e) => setEditForm({ ...editForm, agencyName: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                value={editForm.description}
                                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                            <input
                                                type="text"
                                                value={editForm.location}
                                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                            <input
                                                type="url"
                                                value={editForm.website}
                                                onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleEditProfile}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveModal(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {activeModal === 'password' && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleChangePassword}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Update Password
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveModal(null)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Account Confirmation */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="p-6">
                            <div className="text-center">
                                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <Trash2 className="h-8 w-8 text-red-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Account</h2>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleDeleteAccount}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Yes, Delete Account
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
