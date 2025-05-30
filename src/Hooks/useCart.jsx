import useAuth from "./useAuth";

import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
    // tan stack quarry
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {refetch, data: cart = [] } = useQuery({
        queryKey: ['Users',user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/Users?email=${user.email}`);
            return res.data;
        }
    })
    return[cart,refetch]
};

export default useCart;