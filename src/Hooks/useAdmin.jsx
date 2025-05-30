import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: [user?._id, 'isAdmin'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user._id}`);
      console.log(res.data);
      return res.data?.role === 'admin'; // ধরলাম backend এ role আছে
    },
    enabled: !!user?._id // user._id না থাকলে request যাবে না
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
