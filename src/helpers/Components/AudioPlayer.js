import React, { useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import {cilMediaPause, cilMediaPlay} from "@coreui/icons";
import {CCol, CProgress, CRow} from "@coreui/react";
import ReactAudioPlayer from "react-audio-player";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0)

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        audio.addEventListener("timeupdate", e => {
            setTime(e.target.currentTime)
        });
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
            audio.removeEventListener("timeupdate", () => setTime(0));
        };
    }, []);

    return [playing, time, toggle];
};

const AudioPlayerOld = ({ url }) => {
    const [playing, time, toggle] = useAudio(url);

    return (
        <CRow>
            <CCol sm={2} md={1}>
                <CIcon onClick={toggle} icon={playing ? cilMediaPause : cilMediaPlay} />
            </CCol>
            <CCol sm={10} md={11}>
                <CProgress value={time} />
            </CCol>
        </CRow>
    );
};

const AudioPlayer = ({url}) => {
    return (
        <ReactAudioPlayer className="w-100"
            src={url}
            controls
        />
    )
}

export default AudioPlayer;