import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box } from '@mui/material';
import TeamPreview from './TeamPreview';
import { Link } from 'react-router-dom';
import Team from '../Individuals/Team';
//import DancePreview from './DancePreview';

function TeamFavorites(props) {
    const { teams } = props;

    // const component = (item) => {
    //     switch (type) {
    //         case searchType.PROS:
    //             return <ProPreview pro={item} />;
    //         case searchType.TEAMS:
    //             return <TeamPreview team={item} />;
    //         // case searchType.DANCES:
    //         //     return <DancePreview dance={item} />;
    //         default:
    //             return <></>;
    //     }
    // };

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
                        <TeamPreview team={team} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
        // </Box>
    );
}

export default TeamFavorites;
