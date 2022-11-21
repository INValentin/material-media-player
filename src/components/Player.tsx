
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
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material"

import PlayCircle from "@mui/icons-material/PlayCircle"
import SkipNext from "@mui/icons-material/SkipNext"
import SkipPrevious from "@mui/icons-material/SkipPrevious"
// import VolumeDown from "@mui/icons-material/VolumeDown"
// import VolumeUp from "@mui/icons-material/VolumeUp"
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded"
import VolumeOffRounded from "@mui/icons-material/VolumeOffRounded"
import RepeatOneOnSharp from "@mui/icons-material/RepeatOneOnSharp"
import RepeatRounded from "@mui/icons-material/RepeatRounded"
import PauseCircle from "@mui/icons-material/PauseCircle"
import HeartBrokenOutlined from "@mui/icons-material/HeartBrokenOutlined"
import Link from "@mui/material/Link"

import candyImage from "../assets/candy.png"
import React, { useEffect, useRef, useState } from "react"
import { usePlaylist } from "./usePlaylist"
import { usePlayer } from "./usePlayer"


const Player = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const sliderRef = useRef(null)
    const theme = useTheme()
    const [currentTime, setCurrentTime] = useState(0)
    const [paused, setPaused] = useState(true)
    const [canPlay, setCanPlay] = useState(false)
    const { tracks, currentIndex, playNext, playPrev } = usePlaylist()
    const { currentTrack, onPause, onPlay, onTrackChange, onEnded, player, onTimeUpdate } = usePlayer()

    const handleShowVolume = (event: React.MouseEvent<HTMLElement>) => {
        player.muted = false
        setAnchorEl(event.currentTarget)
    }

    useEffect(() => {
        if (currentIndex === -1 || tracks.length === 0) {
            onTrackChange(null)
        }
    }, [])

    useEffect(() => {
        if (canPlay) {
            onTrackChange(tracks[currentIndex])
            onPlay()
            setCanPlay(false)
        }
    }, [currentIndex, canPlay])

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

    onTimeUpdate(() => {
        setCurrentTime(player.currentTime)
        setPaused(player.paused)
    })

    const togglePlay = () => {
        if (currentIndex === -1 && tracks.length) {
            onTrackChange(tracks[0])
        }

        player.paused ? onPlay() : onPause()
    }

    const handleNext = () => {
        playNext()
        setCanPlay(true)
    }

    const handleToggleRepeat = () => {
        player.loop = !player.loop
    }

    onEnded(handleNext)

    const handlePrev = () => {
        playPrev()
        setCanPlay(true)
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ maxHeight: 400, my: 2 }} >
                <Card sx={{ width: { xs: "100vw", sm: 500, md: 600 } }}>
                    <CardContent>
                        <Box sx={{
                            display: "flex",
                            gap: "1rem",
                            justifyContent: "space-between",
                            flexDirection: { xs: "column-reverse", md: "row" },
                            height: "100%"
                        }}>
                            <Box sx={{ display: "flex", width: "100%", gap: ".5rem", flexDirection: "column" }}>

                                <Typography variant="h6">
                                   Audio Player (Installable)
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    - Enjoy Offline Listening -
                                </Typography>
                                <Divider />
                                <Typography variant="caption" component="p" color="text.warning">
                                    {currentTrack?.name.split(".")[0] || "Track name"}
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
                                    // maxWidth: "fit-content"
                                }}>

                                    <IconButton onClick={handlePrev} size="large">
                                        <SkipPrevious />
                                    </IconButton>
                                    <IconButton onClick={togglePlay} size="large">
                                        {!paused && <PauseCircle sx={{ height: 38, width: 38 }} />}
                                        {paused && <PlayCircle sx={{ height: 38, width: 38 }} />}
                                    </IconButton>
                                    <IconButton onClick={handleNext} size="large">
                                        <SkipNext />
                                    </IconButton>
                                    <IconButton onClick={handleToggleRepeat} size="large">
                                        {player.loop ? <RepeatOneOnSharp /> : <RepeatRounded />}
                                    </IconButton>
                                    <IconButton
                                        aria-controls="volume-menu"
                                        onClick={handleShowVolume} size="large">
                                        {(player.muted || player.volume === 0) ? <VolumeOffRounded /> : <VolumeUpRounded />}
                                    </IconButton>
                                </Box>
                                <Divider />
                                <Stack spacing={0.5} mt={1} alignItems="center" direction="row">
                                    <Typography variant="caption">Made with </Typography>
                                    <HeartBrokenOutlined />
                                    <Typography variant="caption">by <Link target="_blank" href="https://valentinportifolio.netlify.app">Valentin</Link></Typography>
                                </Stack>
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
                                display: { md: "flex", xs: "none" },
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