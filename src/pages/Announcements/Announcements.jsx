import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Announce } from '../../components/Announce/Announce';
import s from './Annoncements.module.css';

import axios from '../../axios';
import { fetchAnnouncements } from '../../redux/slices/announcements';
import { ProfileSideBar } from '../../components/ProfileSideBar/ProfileSideBar';

export const Announcements = () => {
    const dispatch = useDispatch();
    const announcements = useSelector(state => state.announcements.announcements);
    const { userData } = useSelector(state => state?.auth?.data)


    console.log(announcements)

    const isAnnouncementsLoading = announcements.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchAnnouncements())
    }, [])
   


    return (
        <div className={s.announcements__flex}>
            <div className={s.announcements_wrapper} >
                {
                    isAnnouncementsLoading ?
                        <p>Loading...</p>
                        :
                        (announcements.items).filter(announce => announce.user._id !== userData?._id).map((announce, index) =>
                        (
                            <div className={s.announce}>
                                <Announce
                                    key={index}
                                    id={announce._id}
                                    title={announce.title}
                                    description={announce.description}
                                    tags={announce.tags}
                                    viewsNum={announce.viewsNum}
                                    user={announce.user}

                                />
                            </div>
                        )

                        )}
            </div>
            <ProfileSideBar />

            </div>
            )
}
