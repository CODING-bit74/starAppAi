// import { auth } from "@/auth"; // Removed
import { UserSidebar } from "@/components/UserSidebar";
// import { redirect } from "next/navigation"; // Removed

export default async function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const session = await auth();

    // if (!session) {
    //     redirect("/auth/login");
    // }

    // Optional: If user is admin, maybe they should go to admin panel?
    // Or keep them here to see subscriber view? 
    // Generally, admins might want to use the user dashboard too.
    // But let's verify if user requested strict separation.
    // "admin has full right but user have only view rights".
    // Does not imply admin cannot view user dashboard.
    // We will keep admin allowed in user dashboard.

    return (
        <div className="flex h-screen overflow-hidden bg-[#0B0F19]">
            <UserSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
