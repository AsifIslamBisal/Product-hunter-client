import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !!user?.email, // ✅ ensures email exists before API call
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log("Admin check result:", res.data);
            return res.data?.admin;
        }
    });

    return [isAdmin , isAdminLoading]; // ✅ fallback false if undefined
};
// ?? false,
export default useAdmin;
