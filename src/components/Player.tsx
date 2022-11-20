
import CardMedia from "@mui/material/CardMedia"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Slider from "@mui/material/Slider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useTheme } from "@mui/material"

import PlayCircle from "@mui/icons-material/PlayCircle"
import SkipNext from "@mui/icons-material/SkipNext"
import SkipPrevious from "@mui/icons-material/SkipPrevious"
// import VolumeDown from "@mui/icons-material/VolumeDown"
// import VolumeUp from "@mui/icons-material/VolumeUp"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import PauseCircle from "@mui/icons-material/PauseCircle"

import candyImage from "../assets/candy.png"
import React, { useEffect, useRef, useState } from "react"
import { usePlaylist } from "./usePlaylist"
import { usePlayer } from "./usePlayer"


const Player = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const sliderRef = useRef(null)
    const theme = useTheme()
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [paused, setPaused] = useState(true)
    const { currentIndex, tracks, currentTrack, playNext, playPrev } = usePlaylist()
    const { onPause, onPlay, onEnded, player, onVolumeChange, onTrackChange, onTimeUpdate } = usePlayer()
    const [canPlay, setCanPlay] = useState(false)

    useEffect(() => {
        if (canPlay) {
            onTrackChange(currentTrack)
            onPlay()
            setCanPlay(false)
        }
    }, [currentTrack])

    const handleShowVolume = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const formatTime = (secs: number): string => {
        let mins = Math.floor(secs / 60) || 0
        let seconds = Math.floor(secs - (mins * 60)) || 0
        const withTrailingZero = (num: number) => `${num < 10 ? "0" + num : num}`
        return `${withTrailingZero(mins)}:${withTrailingZero(seconds)}`
    }

    const handleHideVolume = () => {
        setAnchorEl(null)
    }

    const handleChangeVolume = (value: number) => {
        player.volume = value / 100
    }

    const handleSeek = (value: number) => {
        player.currentTime = Number(value * player.duration / 100) || 0
    }

    onVolumeChange(() => {
        setVolume(player.volume)
    })

    onTimeUpdate(() => {
        setCurrentTime(player.currentTime)
        setPaused(player.paused)
    })

    const togglePlay = () => {
        player.paused ? onPlay() : onPause()
    }

    const handleNext = () => {
        playNext()
        setCanPlay(true)
    }

    onEnded(handleNext)

    const handlePrev = () => {
        playPrev()
        setCanPlay(true)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: { lg: 600, md: 500, sm: 300 }, maxHeight: 400, m: 2 }} >
                <Card sx={{ boxShadow: theme.shadows[10], background: "primary.main" }}>
                    <CardContent>
                        <Box sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "space-between",
                            height: "100%"
                        }}>
                            <Box sx={{ display: "flex", gap: ".5rem", flexDirection: "column" }}>

                                <Typography variant="h6">
                                    Audio Player
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    - Wave Winds -
                                </Typography>
                                <Divider />
                                <Typography variant="caption" component="p" color="text.warning">
                                    {currentTrack?.name || "Track name"}
                                </Typography>

                                <Divider />
                                <Stack direction="row" alignItems={"center"} spacing={2}>
                                    <Typography variant="caption">{formatTime(currentTime)}</Typography>
                                    <Slider
                                        sx={{
                                            "& .MuiSlider-thumb": {
                                                height: 12,
                                                width: 12,
                                            }
                                        }}
                                        min={0} max={100} value={(currentTime * 100 / player.duration) || 0} ref={sliderRef} onChangeCommitted={(_, value) => handleSeek(value as number)} />
                                    <Typography variant="caption">{formatTime(player.duration)}</Typography>
                                </Stack>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "0px solid",
                                    borderColor: theme.palette.primary.main,
                                    borderRadius: theme.shape.borderRadius,
                                    padding: ".25rem",
                                    maxWidth: "fit-content"
                                }}>

                                    <IconButton onClick={handleNext} size="large">
                                        <SkipPrevious />
                                    </IconButton>
                                    <IconButton onClick={togglePlay} size="large">
                                        {!paused && <PauseCircle sx={{ height: 38, width: 38 }} />}
                                        {paused && <PlayCircle sx={{ height: 38, width: 38 }} />}
                                    </IconButton>
                                    <IconButton onClick={handlePrev} size="large">
                                        <SkipNext />
                                    </IconButton>
                                    <IconButton
                                        aria-controls="volume-menu"
                                        onClick={handleShowVolume} size="large">
                                        <VolumeUpRounded />
                                    </IconButton>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleHideVolume}
                                    sx={{ width: 200, }}
                                >
                                    <Stack sx={{ px: 1 }}>
                                        <Slider max={100} min={0} onChangeCommitted={(_, value) => handleChangeVolume(value as number)} value={player.volume * 100} sx={{ width: 70, mx: 1 }} color="secondary" />
                                    </Stack>
                                </Menu>
                            </Box>
                            <Box sx={{
                                background: "error",
                                padding: ".5rem",
                                height: 200,
                                display: {md: "flex", xs: "none"},
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: theme.shadows[4]
                            }}>
                                <CardMedia
                                    image={candyImage}
                                    component="img"
                                    sx={{
                                        boderRadius: theme.shape.borderRadius,
                                        border: "0px solid",
                                        objectFit: "cover",
                                        height: 200, width: 200
                                    }}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}


export default Player