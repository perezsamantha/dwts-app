import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import TeamPreview from './TeamPreview';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function TeamFavorites(props) {
    const { teams } = props;

    return (
        <Swiper
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
            modules={[Navigation]}
            className="mySwiper"
        >
            {teams.map((team, index) => (
                <SwiperSlide key={index}>
                    <Link
                        key={index}
                        to={{ pathname: `/teams/${team.id}` }}
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
                            whileTap={{
                                scale: 1.075,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <TeamPreview team={team} />
                        </Box>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default TeamFavorites;
