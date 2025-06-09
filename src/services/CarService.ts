import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ICar} from "../models/ICar.ts";



export const carAPI = createApi({
    reducerPath: 'carAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['Car'],
    endpoints: (build) => ({
        fetchAllCars: build.query<ICar[], number>({
            query: (limit: number = 10) => ({
                url: `/cars`,
                params: {
                    _limit: limit
                }
            }),
        }),
        fetchByCarId: build.query<ICar, string>({
            query: (id: string) => `/cars/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Car', id}],
        }),
        createCar: build.mutation<ICar, ICar>({
            query: (car) => ({
                url: `/cars`,
                method: "POST",
                body: car,
            }),
            invalidatesTags: ['Car']
        }),
        updateCar: build.mutation<ICar, ICar>({
            query: (car) => ({
                url: `/cars/${car.id}`,
                method: "PUT",
                body: car,
            }),
            invalidatesTags: ['Car']
        }),
        deleteCar: build.mutation<ICar, ICar>({
            query: (car) => ({
                url: `/cars/${car.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Car']
        })
    })
})