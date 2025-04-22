import React, { useEffect, useState } from 'react';
import { getBanners } from '../../services/bannerServices';
import bannerMen from '../../assets/banner-men1.png';

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await getBanners();
                if (response) {
                    setBannerData(response);
                } else {
                    console.error("Expected array but got:", response);
                }
            } catch (error) {
                console.error("Banner fetch failed in component:", error);
            }
        };

        fetchBanner();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === bannerData.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [bannerData]);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? bannerData.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === bannerData.length - 1 ? 0 : prev + 1
        );
    };

    const currentImage = bannerData[currentIndex];

    return (
        <>
            {bannerData.length > 0 && (
                <div className="relative w-full justify-center items-center flex overflow-hidden mt-8">
                    <div
                        key={currentImage._id}
                        className="relative w-full sm:w-[90%] md:w-[80%] h-[150px] sm:h-[250px] md:h-[350px] lg:h-[450px] xl:h-[450px] bg-cover bg-center bg-no-repeat flex items-center rounded "
                        style={{
                            backgroundColor: currentImage.backgroundColor,
                            backgroundImage: `url(${currentImage.imageUrl})`
                        }}
                    >
                        {/* Overlay content container */}
                        <div className="container mx-auto px-4 flex items-center">
                            {/* Left side - Static image */}
                            <div className='block w-1/3 lg:w-2/5 xl:w-[400px]'>
                                <img
                                    src={bannerMen}
                                    alt="banner-men"
                                    className='w-[90px] sm:w-[150px] md:w-[200px] lg:w-[300px] max-w-[400px] object-cover'
                                />
                            </div>

                            {/* Right side - Text content */}
                            <div className="w-full md:w-2/3 lg:w-3/5 xl:w-1/2 text-center md:text-left px-2">
                                <h2 className="text-black text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl uppercase font-extrabold mb-2 lg:mb-4">
                                    {currentImage.title}
                                </h2>
                                <div className='inline-block text-red-600 rounded-2xl py-1 md:py-4'>
                                    <h4 className='text-xs sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase'>
                                        {currentImage.ctaText}
                                    </h4>
                                </div>
                                <div className='py-1 text-center flex justify-center items-center'>
                                    <button className='bg-red-600 w-20 h-6 sm:w-25 sm:h-8 md:w-32 md:h-12 text-sm md:text-xl font-bold text-white rounded'>{currentImage.link}</button>
                                </div>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 bg-black/30 rounded-full hover:bg-black/50 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {bannerData.length === 0 && (
                <div className="text-center py-20">
                    <p>Loading banners...</p>
                </div>
            )}
        </>
    );
};

export default Banner;