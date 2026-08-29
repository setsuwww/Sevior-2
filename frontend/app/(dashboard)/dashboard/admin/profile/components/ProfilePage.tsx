"use client";

import { CheckCircle, XCircle } from "lucide-react";

import { useAdminProfile } from "../logic/useAdminProfile";

import UserSection from "../components/SectionUser";
import AgencySection from "../components/SectionAgency";
import ProfileFooter from "../components/ProfileFooterSection";

import ProfileModal from "../components/ProfileModal";

export function AdminProfilePage() {
    const {
        profile,
        loading,

        activeModal,
        openModal,
        closeModal,

        profileTheme, setProfileTheme,
        setShowDeleteConfirm,

        successMessage,
        errorMessage,

        register,
        handleSubmit,
        onSubmitProfile,
        profileErrors,
        saving,

        userImage,
        agencyImage,

        userImagePreview,
        agencyImagePreview,

        handleUserImageChange,
        handleAgencyImageChange,

        resetUserImage,
        resetAgencyImage,

        handleLogout,
        loggingOut,

        setActiveModal,
    } = useAdminProfile();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-olive-50">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-teal-600" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-olive-50">
                <div className="text-center">
                    <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />

                    <h2 className="text-2xl font-semibold text-olive-700">
                        Profile Not Found
                    </h2>

                    <p className="mt-2 text-olive-500">
                        Unable to load profile information.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Success */}
            {successMessage && (
                <div className="fixed right-4 top-4 z-[100]">
                    <div className="rounded-sm border border-green-200 bg-green-50 p-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />

                            <p className="font-medium text-green-700">
                                {successMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Error */}
            {errorMessage && (
                <div className="fixed right-4 top-4 z-[100]">
                    <div className="rounded-sm border border-red-200 bg-red-50 p-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-500" />

                            <p className="font-medium text-red-700">
                                {errorMessage}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto">
                <div className="overflow-hidden rounded-sm border border-olive-200 bg-white shadow-sm">
                    {/* User */}
                    <UserSection
                        profile={profile}
                        userImagePreview={userImagePreview}
                        onEditProfile={() =>
                            openModal("edit")
                        }
                        onEditPhoto={() =>
                            openModal("edit")
                        }
                    />

                    {/* Agency */}
                    {profile.Agency && (
                        <div className="px-8">
                            <AgencySection
                                agency={profile.Agency}
                                agencyImagePreview={
                                    agencyImagePreview
                                }
                            />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="px-8 pb-8">
                        <ProfileFooter
                            onChangePassword={() =>
                                openModal("password")
                            }
                            onLogout={handleLogout}
                            onDeleteAccount={() =>
                                setShowDeleteConfirm(true)
                            }
                            loggingOut={loggingOut}
                        />
                    </div>
                </div>
            </div>

            {activeModal === "edit" && (
                <ProfileModal
                    profile={profile}

                    profileTheme={profileTheme}
                    onProfileThemeChange={setProfileTheme}

                    userImage={userImage}
                    agencyImage={agencyImage}
                    userImagePreview={userImagePreview}
                    agencyImagePreview={agencyImagePreview}
                    onUserImageChange={handleUserImageChange}
                    onAgencyImageChange={handleAgencyImageChange}
                    onSubmit={handleSubmit(onSubmitProfile)}
                    onClose={() => {
                        resetUserImage();
                        resetAgencyImage();
                        setActiveModal(null);
                    }}
                    register={register}
                    errors={profileErrors}
                    saving={saving}
                    resetUserImage={resetUserImage}
                    resetAgencyImage={resetAgencyImage}
                />
            )}

            {/* Password + Delete Modal */}
            {/* Tetap gunakan modal component yang sudah lu punya / kita pisahkan berikutnya */}
        </div>
    );
}
