import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import ProPreview from './ProPreview';
import { Link } from 'react-router-dom';

function ProFavorites(props) {
    const { pros } = props;

    return (
        // <Box my={2}>
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            // pagination={{
            //     clickable: true,
            // }}
            navigation={true}
            breakpoints={{
                300: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                350: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
                880: {
                    slidesPerView: 7,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 8,
                    spaceBetween: 15,
                },
            }}
            // modules={[Pagination]}
            modules={[Navigation]}
            className="mySwiper"
        >
            {pros.map((pro, index) => (
                <SwiperSlide key={index}>
                    <Link
                        key={index}
                        to={{ pathname: `/pros/${pro.id}` }}
                        style={{
                            textDecoration: 'inherit',
                            color: 'inherit',
                        }}
                    >
                        <ProPreview pro={pro} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
        // </Box>
    );
}

export default ProFavorites;
