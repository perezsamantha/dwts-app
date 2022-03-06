import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import { pros } from '../Dashboard/Birthdays/sampleData';
import ProPreview from './ProPreview';

function Favorites() {
    return (
        // <Box my={2}>
        <Swiper
            slidesPerView={3}
            spaceBetween={5}
            pagination={{
                clickable: true,
            }}
            //navigation={true}
            breakpoints={{
                300: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 7,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 9,
                    spaceBetween: 10,
                },
            }}
            modules={[Pagination]}
            //modules={[Navigation]}
            //className="mySwiper"
        >
            {pros.map((pro, index) => (
                <SwiperSlide key={index}>
                    {/* <Paper
                                elevation={4}
                                sx={{ height: 50, width: 50, padding: 3 }}
                            >
                                <Typography>test</Typography>
                            </Paper> */}
                    <ProPreview pro={pro} />
                </SwiperSlide>
            ))}
        </Swiper>
        // </Box>
    );
}

export default Favorites;
