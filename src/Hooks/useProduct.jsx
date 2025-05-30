import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: products = [], isPending: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/products'); // ✅ endpoint ঠিক করা হয়েছে
            return res.data;
        }
    });

    return [Array.isArray(products) ? products : [], loading, refetch]; // ✅ safe fallback
};

export default useProduct;
