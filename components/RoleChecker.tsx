"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

interface RoleCheckerProps {
    requiredRoles: string[];
    children: React.ReactNode;
}

const RoleChecker: React.FC<RoleCheckerProps> = ({ requiredRoles, children }) => {
    const { data: session, status } = useSession();
    const [hasAccess, setHasAccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true); // สถานะการโหลด

    useEffect(() => {
        if (status === "unauthenticated") {
            window.location.href = "/";
            return;
        }

        const fetchRoles = async () => {
            try {
                const res = await axios.get(`/api/auth/access/${session?.user.email}`);
                const userRoles = res.data.roles || [];

                const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
                setHasAccess(hasRequiredRole);

                if (!hasRequiredRole) {
                    setErrorMessage("คุณไม่ได้รับอนุญาตให้เข้าถึงหน้านี้");
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
                setErrorMessage("เกิดข้อผิดพลาดในการดึงข้อมูลบทบาท");
            } finally {
                setLoading(false); // เปลี่ยนสถานะการโหลดเป็น false
            }
        };

        fetchRoles();
    }, [session, status, requiredRoles]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loader"></div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex flex-col items-center justify-start h-screen">
                <h1 className="text-6xl text-red-600 mb-4">403</h1>
                <div className="alert alert-warning bg-red-500 border border-red-500 text-white p-4 rounded shadow-md">
                    <strong>ข้อผิดพลาด:</strong> {errorMessage}
                </div>
            </div>
        );
    }

    return hasAccess ? <>{children}</> : null;
};

export default RoleChecker;