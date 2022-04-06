import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import TeamPreview from './Previews/TeamPreview';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

function TeamsSlider(props) {
    const { filteredTeams, item, sortType } = props;

    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={10}
            navigation={true}
            breakpoints={{
                300: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                },
                450: {
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
            modules={[Navigation]}
            className="mySwiper"
        >
            {filteredTeams
                .filter((team) =>
                    sortType === 'season'
                        ? Number(team.season_id) === Number(item)
                        : sortType === 'placement'
                        ? Number(team.placement) === Number(item)
                        : ''
                )
                .map((team, index) => (
                    <SwiperSlide key={index}>
                        <Link
                            key={index}
                            to={{
                                pathname: `/teams/${team.id}`,
                            }}
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
                            >
                                <TeamPreview
                                    key={index}
                                    team={team}
                                    sortType={sortType}
                                />
                            </Box>
                        </Link>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default TeamsSlider;
