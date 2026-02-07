// import { auth } from "@/auth"; // Removed
import { AdminSidebar } from "@/components/AdminSidebar";
// import { redirect } from "next/navigation"; // Removed

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const session = await auth();

    // Protect Admin Routes - REMOVED (Relies on Port 3001)
    // if (!session || (session.user as any)?.role !== "admin") {
    //     redirect("/dashboard");
    // }

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
