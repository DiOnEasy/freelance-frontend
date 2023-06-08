import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import s from './AddAnnounce.module.css'
import { selectIsAuth } from '../../redux/slices/auth';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";




export const AddAnnounce = () => {



  const { id } = useParams()
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth)

  const [isLoading, setIsLoading] = useState(false)

  // const [file, setFile] = useState('')

  const [fields, setFields] = useState({
    title: 'title',
    timeLine: null,
    description: 'description',
    price: null,
  }
  )

  const isEditing = Boolean(id)


 

  const onChange = React.useCallback((fields) => {
    setFields((exValues) => ({ ...exValues, description: fields }));
    console.log(fields)

  }, []);
  console.log(fields)


  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const { data } = isEditing
        ?
        await axios.patch(`/announce/${id}`, fields)
        :
        await axios.post('/announcements', fields)

        ;
      // const id = data._id;
      navigate(`/announcements`)
    }
    catch (err) {
      console.warn(err);
      alert('Didn`t add announce')
    }
  };

  const options = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        delay: 1000,
      },
    };
  }, []);


  React.useEffect(() => {
    if (id) {
      axios.get(`/announce/${id}`).then(({ data }) => {
        console.log(data)
        setFields({
          title: data.title,
          timeLine: data.timeLine,
          description: data.description,
          price: data.price,
          file: data.file,
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }, [])

  console.log(fields)

  return (
    <>
      {!window.localStorage.getItem('token') && !isAuth
        ?
        <Navigate to='/' />
        :
        <div className={s.add__wrapper}>
          <input value={fields.title} onChange={(e) => { setFields((exValues) => ({ ...exValues, title: e.target.value })) }} placeholder="Title" type="text" />
          <input value={fields.timeLine} onChange={(e) => { setFields((exValues) => ({ ...exValues, timeLine: e.target.value })) }} placeholder="Enter timeline(number of days)" type="number" />
          <div className={s.editor}>
            <SimpleMDE value={fields.description} onChange={onChange} />
          </div>
          <input value={fields.price} onChange={(e) => { setFields((exValues) => ({ ...exValues, price: e.target.value })) }} type="number" placeholder="Enter price" />
          <button className={s.button__submit} value={fields.file} onClick={onSubmit}>
            {
              isEditing
                ?
                'Save'
                :
                'Publish'
            }

          </button>
        </div>
      }
    </>
  )
}

