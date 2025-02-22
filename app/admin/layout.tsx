// app/admin/layout.tsx
import React from 'react';
import AdminMenu from '@/components/AdminMenu';
import RoleChecker from '@/components/RoleChecker';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <RoleChecker requiredRoles={["superadmin", "admin", "editor"]}>

            <div className="bg-[#282b30] rounded-md p-5 mb-3">
                {children}
            </div>
        </RoleChecker>
    );
}