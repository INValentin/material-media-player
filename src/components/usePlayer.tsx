import React, { useEffect, useRef, useState } from 'react'

interface PlayerAPI {
    player: HTMLAudioElement
    currentTrack: File | null
    addPlayer: (player: HTMLAudioElement) => void
    onPause: () => void
    onPlay: () => void
    onVolumeChange: (callback: (ev: Event) => void) => void
    onEnded: (callback: (ev: Event) => void) => void
    onTimeUpdate: (callback: (ev: Event) => void) => void
    onTrackChange: (track: File | null) => void
    onSeek: (time: number) => void
}

const PlayerContext = React.createContext({} as PlayerAPI)

export const usePlayer = () => {
    return React.useContext(PlayerContext)
}

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const playerRef = useRef<HTMLAudioElement>(new Audio)
    playerRef.current.crossOrigin = 'anonymous';
    const [player, setPlayer] = useState(playerRef.current)
    const [currentTrack, setCurrentTrack] = useState<File | null>(null)

    useEffect(() => {
        const newPlayer = playerRef.current
        newPlayer.crossOrigin = 'anonymous';
        setPlayer(newPlayer)
    }, [])

    useEffect(() => {
        if (!currentTrack) {
            player.src = ""
        } else {
            window.document.title = currentTrack.name.split(".")[0].slice(0,30) + " | " + "Media Player"
        }
    }, [currentTrack])

    const addPlayer = (player: HTMLAudioElement) => {
        setPlayer(player)
    }

    const onPause = () => {
        player?.pause()
    }

    const onPlay = () => {
        player?.play()
    }

    const onEnded = (callback: (ev: Event) => void) => {
        player?.addEventListener("ended", callback)
    }

    const onVolumeChange = (callback: (ev: Event) => void) => {
        player?.addEventListener("volumechange", callback)
    }

    const onTrackChange = (track: File | null) => {
        if (!player) return
        if (!track) {
            setCurrentTrack(null)
            return
        }
        setCurrentTrack(track)
        const url = window.URL.createObjectURL(track)
        player.src = url
    }

    const onTimeUpdate = (callBack: (ev: Event) => void) => {
        player?.addEventListener("timeupdate", callBack)
    }

    const onSeek = (time: number) => {
        if (player) player.currentTime = time
    }

    const playerAPI = {
        player,
        currentTrack,
        addPlayer,
        onPause,
        onPlay,
        onVolumeChange,
        onEnded,
        onTimeUpdate,
        onTrackChange,
        onSeek
    }

    return <PlayerContext.Provider value={playerAPI}>
        {children}
    </PlayerContext.Provider>
}
export default PlayerProvider