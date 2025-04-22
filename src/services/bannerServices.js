import API from "../api/axios"

export const CreateBanner = async (bannerData) => {
    try {
        const banner = await API.post('/create/newBanner', bannerData);
        if (banner.status === 201) {
            return banner.data;
        }
    } catch (error) {
        if (error.banner) {
            return error.banner.data;
        }
        return { message: "Something Went Wrong" };
    }
}


export const getBanners = async () => {
    try {
        const response = await API.get('/all/activeBanners');
        console.log(response.data)
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Invalid data format");
        }
    } catch (error) {
        console.error("Banner fetch failed:", error);
        return [];
    }
}
