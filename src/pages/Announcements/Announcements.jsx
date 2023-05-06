import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Announce } from '../../components/Announce/Announce';
import s from './Annoncements.module.css';

import axios from '../../axios';
import { fetchAnnouncements } from '../../redux/slices/announcements';

export const Announcements = () => {
    const dispatch = useDispatch();
    const announcements = useSelector(state => state.announcements.announcements);

    console.log(announcements)

    const isAnnouncementsLoading = announcements.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchAnnouncements())
    }, [])



    return (
        <>
            <div className={s.announcements_wrapper} >
                {
                    isAnnouncementsLoading ?
                    <p>Loading...</p>
                    :
                (announcements.items).map((announce, index) =>
                        (
                            <Announce
                                key={index}
                                id={announce._id}
                                title={announce.title}
                                description={announce.description}
                                tags={announce.tags}
                                viewsNum={announce.viewsNum}
                                user={announce.user}

                            />
                        )

                )}

            </div>
        </>
    )
}
