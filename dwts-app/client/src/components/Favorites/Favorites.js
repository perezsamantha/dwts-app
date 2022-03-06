import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import { pros } from '../Dashboard/Birthdays/sampleData';
import ProPreview from './ProPreview';
import * as searchType from '../../constants/searchTypes';
import TeamPreview from './TeamPreview';
import DancePreview from './DancePreview';

function Favorites(props) {
    const { arr, type } = props;

    const component = (item) => {
        switch (type) {
            case searchType.PROS:
                return <ProPreview pro={item} />;
            case searchType.TEAMS:
                return <TeamPreview team={item} />;
            case searchType.DANCES:
                return <DancePreview dance={item} />;
            default:
                return <></>;
        }
    };

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
            {arr.map((item, index) => (
                <SwiperSlide key={index}>{component(item)}</SwiperSlide>
            ))}
        </Swiper>
        // </Box>
    );
}

export default Favorites;
