import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
    const AxiosPublic = useAxiosPublic();

    const { data: products = [], isPending: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await AxiosPublic.get('/products'); 
            return res.data;
        }
    });

    return [Array.isArray(products) ? products : [], loading, refetch]; 
};

export default useProduct;
