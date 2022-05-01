import { Swiper, SwiperSlide } from 'swiper/react';

import { Lazy, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import { Box } from '@mui/material';
import ProPreview from './ProPreview';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProFavorites(props) {
    const { pros } = props;

    return (
        <Swiper
            lazy={{ loadPrevNext: true }}
            preloadImages={false}
            slidesPerView={3}
            spaceBetween={10}
            navigation={true}
            breakpoints={{
                0: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                450: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                600: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                750: {
                    slidesPerView: 5,
                    spaceBetween: 15,
                },
                900: {
                    slidesPerView: 6,
                    spaceBetween: 15,
                },
                1200: {
                    slidesPerView: 8,
                    spaceBetween: 15,
                },
                1536: {
                    slidesPerView: 10,
                    spaceBetween: 15,
                },
            }}
            modules={[Lazy, Navigation]}
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
                        <Box
                            component={motion.div}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.3 },
                            }}
                            // whileTap={{
                            //     scale: 1.075,
                            //     transition: { duration: 0.3 },
                            // }}
                        >
                            <ProPreview pro={pro} />
                        </Box>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ProFavorites;
