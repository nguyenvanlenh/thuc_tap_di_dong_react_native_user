import { useState, useEffect } from "react";
import { API_GET_PATHS } from "../services/PathApi";

export const useFetchData = (type) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_GET_PATHS.lay_ds_ao + `${type}` + "?page=" +
                `${page}` +
                "&pageSize=3");
            const newData = await response.json();
            setData((prevData) => [...prevData, ...newData.data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom =
            layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;

        if (isCloseToBottom && !loading) {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data when component mounts

    return { data, handleScroll };
};

export const useFetchDataSuggested = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_GET_PATHS.lay_ds_ao_all + "?page=" +
                `${page}`);
            const newData = await response.json();
            setData((prevData) => [...prevData, ...newData.data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;

        if (isCloseToBottom && !loading) {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data when component mounts

    return { data, handleScroll };
};