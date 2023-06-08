
import s from './MyOrders.module.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../redux/slices/orders';
import axios from '../../axios'



export const MyOrders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);

    console.log(orders)

    const isOrdersLoading = orders.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    console.log(orders.items)

    const onSubmit = async (id, orderStatus) => {
        await axios.patch(`/orders/${id}`, { status: orderStatus })
        dispatch(fetchOrders())
    }

    return (
        <div className={s.order__wrapper}>
            {
                isOrdersLoading ?
                    <p>Loading...</p>
                    :
                    (orders.items).map((order, index) => (
                        <div className={s.content__wrapper}>
                            <div className={s.order__info}>
                                <p className={s.task__title}>{order.task.title} </p>
                                <p className={s.order__description}>{order.task.description} </p>
                                <div className={s.info__wrapper}>
                                    <p>Price: {order.task.price} $</p>
                                    <p>Timeline: {order.task.timeLine} day(s)</p>
                                    <p>Status: {order.status}</p>
                                </div>
                            </div>
                            <div className={s.order__offer}>
                                <p className={s.task__title}>{order.taskName}</p>
                                <p className={s.order__description}>{order.taskDescription}</p>
                            </div>
                            {
                                order.status === 'open'
                                    ?
                                    <>
                                        <button onClick={() => onSubmit(order._id, 'in development')}>Submit</button>
                                        <button onClick={() => onSubmit(order._id, 'canceled')}>Cancel</button>
                                    </>
                                    :
                                    <button onClick={() => onSubmit(order._id, 'confirmed')}>Confirm</button>
                            }

                        </div>
                    ))
            }
        </div>
    )
}

