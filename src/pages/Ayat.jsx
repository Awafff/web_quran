import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json, Link, useParams } from 'react-router-dom'
import Main from '../layout/Main';
import Shimmer from '../components/Shimmer'
import { useLocation } from 'react-router-dom'

const Ayat = () => {
    const location = useLocation()
    console.log(location)

    // const [scrollTop, setScrollTop] = useState(false)
    const [detailSurat, setDetailSurat] = useState([])
    const [detailAyat, setDetailAyat] = useState([])
    const [loading, setLoading] = useState(false)
    
    const {id} = useParams()
    const {ayat} = useParams()

    const getDetailSurah = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://api.quran.gading.dev/surah/${id}`)
            setDetailSurat(res.data.data)
            console.log(res.data.data);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(true)
        } finally {
            setLoading(false)
        }
    }

    const getAyat = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://api.quran.gading.dev/surah/${id}/${ayat}`)
            console.log(res.data.data);
            setDetailAyat(res.data.data)
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(true)
        } finally {
            setLoading(false)
        }
    }

    const openDesc = () => {
        const desc = document.querySelector(".desc")
        desc.classList.toggle("hidden")
    }
    
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = () => {
        const audio = document.getElementById(`audio`);
        audio.play();
        setIsPlaying(true);
        console.log("play");
    };

    const pauseAudio = () => {
        const audio = document.getElementById(`audio`);
        audio.pause();
        setIsPlaying(false);
        console.log("pause");
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        getDetailSurah()
        getAyat()      
    }, [location.key])

  return (
    <Main>
        <div className='md:w-5/12 md:mx-auto bg-white min-h-screen'>
            <nav className='py-6 px-7'>
                <div className='flex justify-between text-gray-500'>
                    <div className="flex gap-2 items-end">
                        <Link to={"/"}>
                            <i className="fa-solid fa-home"></i>
                            <i className="fa-solid fa-chevron-right ml-2 scale-75 text-slate-600"></i>
                        </Link>
                        <Link to={`/${detailSurat?.number}`} className="text-slate-700 text-sm">{detailSurat?.name?.transliteration?.id} : {detailAyat?.number?.inSurah}</Link>
                    </div>
                    <div>
                        <span id='clock' className='text-sm'></span>
                    </div>
                </div>
            </nav>
            {loading ? (
                <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                    <div className='text-center'>
                        <Shimmer width="70" height="20" className="mx-auto" />
                        <Shimmer width="90" height="20" className="mt-1 mx-auto" />
                        <div className="flex justify-around items-center">
                            <Shimmer width="20" height="20" className="" />
                            <p className='text-gray-500 text-base mt-2 mb-4'></p>
                            <Shimmer width="20" height="20" className="" />
                        </div>
                        <hr />
                        <Shimmer width="120" height="20" className="mt-2 mx-auto" />
                    </div>
                    <div className='mt-8'>
                        <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                            <div className="flex gap-3 items-center justify-between">
                                <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border overflow-hidden'>
                                    <Shimmer width="80" height="80" className="rounded-full overflow-hidden" />
                                </span>
                                <div className='flex gap-4'>
                                    <Shimmer width="40" height="20" className="" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Shimmer width="150" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="140" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="220" height="20" className="mt-1 ms-auto" />
                                <Shimmer width="220" height="20" className="mt-1 ms-auto" />
                            </div>
                            <div className="text-left">
                                <Shimmer width="50" height="20" className="mt-1 me-auto" />
                                <Shimmer width="400" height="20" className="mt-1 me-auto" />
                                <Shimmer width="400" height="20" className="mt-1 me-auto" />
                                <Shimmer width="400" height="20" className="mt-1 me-auto" />
                                <Shimmer width="400" height="20" className="mt-1 me-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='px-7 pt-6' style={{overflow: "hidden"}}>
                    <div className='text-center'>
                            <p className='text-gray-800 font-semibold text-2xl nama-surah'>
                                <span>
                                    {detailSurat?.name?.short}
                                </span>
                            </p>
                            <p className='text-gray-800 font-semibold text-lg mt-2'>Ayat ke {ayat}</p>
                        <div className="flex justify-around items-center">
                            <Link to={`/${id}/${detailAyat?.number?.inSurah - 1 == 0 ? 1 : detailAyat?.number?.inSurah - 1}`}
                            className={`${detailAyat?.number?.inSurah - 1 < 1 ? 'hidden' : 'inline'}`}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </Link>
                            <p className='text-gray-500 text-base mt-2 mb-4'>{detailSurat?.arti}</p>
                            <Link to={`/${id}/${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? detailSurat?.numberOfVerses : detailAyat?.number?.inSurah + 1}`}
                            className={`${detailAyat?.number?.inSurah + 1 > detailSurat?.numberOfVerses ? 'hidden' : 'inline'}`}>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                        <hr />
                        <p className='text-gray-500 my-3'>
                            <span>{detailSurat?.revelation?.id}</span> - <span>{detailSurat?.numberOfVerses} ayat</span>
                        </p>
                        <p className='text-gray-500 desc hidden'>{detailSurat?.tafsir?.id}</p>
                    </div>
                    <div className='mt-8'>
                        <div className='py-6 border-b flex-column gap-4 items-start justify-between'>
                            <div className="flex gap-3 items-center justify-between">
                                <span className='flex justify-center items-center text-slate-500 text-sm w-10 h-10 radius border'>{detailAyat?.number?.inSurah}</span>
                                <div className='flex gap-4'>
                                    <span onClick={() => (isPlaying ? pauseAudio() : playAudio())} className={`cursor-pointer`}>
                                        {isPlaying ? (
                                            <i className="text-gray-500 fa-sharp fa-solid fa-pause"></i>
                                        ) : (
                                            <i className="text-gray-500 fa-sharp fa-solid fa-play"></i>
                                        )}
                                    </span>
                                    {/* <a href={`/${detailSurat.number}/${i + 1}`}>
                                        <span>
                                            <i className="text-gray-500 fa-sharp fa-solid fa-book-open"></i>
                                        </span>
                                    </a> */}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className='nama-surah text-2xl mb-5 leading-[4rem]'>{detailAyat?.text?.arab}</p>
                                <p className='mb-3'>{detailAyat?.text?.transliteration?.en}</p>
                                <p className='text-slate-700 mb-2'>{detailAyat?.translation?.id}</p>
                                <div className="text-left">
                                    <p className="mt-2">Tafsir: </p>
                                    <p className='text-slate-800 text-justify mb-2'>{detailAyat?.tafsir?.id?.long}</p>
                                </div>
                                <audio src={detailAyat?.audio?.primary} id={`audio`} className="absolute opacity-0" controls onEnded={handleAudioEnded}></audio>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </Main>
  )
}

export default Ayat