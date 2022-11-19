import React, { EventHandler, useEffect, useMemo, useState } from 'react'

interface PlayerAPI {
    duration: number
    addPlayer: (player: HTMLAudioElement) => void
    onPause: () => void
    onPlay: () => void
    onVolumeChange: (callback: (ev: Event) => void) => void
    onEnded: (callback: (ev: Event) => void) => void
    onTimeUpdate: (callback: (ev: Event) => void) => void
    onTrackChange: (track: File | null) => void
    onSeek: (time: number) => void
    log: string
}

const PlayerContext = React.createContext({} as PlayerAPI)

export const usePlayer = () => {
    return React.useContext(PlayerContext)
}

const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const [player, setPlayer] = useState<HTMLAudioElement | null>()
    const [log, setLog] = useState("")

    const addLog = useMemo(
        () => (newlog: any) => setLog(log + " / " + JSON.stringify({newlog}))
    , [log])

    useEffect(() => {
        const newPlayer = new Audio()
        newPlayer.crossOrigin = 'anonymous';

        setPlayer(newPlayer)
    }, [])

    useEffect(() => {
        addLog(player)
        player?.addEventListener("canplay", e => addLog("canplay"))
    }, [player])

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
            player.pause()
            player.src = ""
            return
        }
        const url = window.URL.createObjectURL(track)
        addLog({url, name: track.name})
        player.src = url
        player.play().then(e => addLog("PLAY")).catch(er => addLog({m: er.message, str: "ERROR"}))
    }

    const onTimeUpdate = (callBack: (ev: Event) => void) => {
        player?.addEventListener("timeupdate", callBack)
    }

    const onSeek = (time: number) => {
        if (player) player.currentTime = time
    }

    const playerAPI = {
        duration: Number(player?.duration),
        addPlayer,
        onPause,
        onPlay,
        onVolumeChange,
        onEnded,
        onTimeUpdate,
        onTrackChange,
        onSeek,
        log
    }

    return <PlayerContext.Provider value={playerAPI}>
        {children}
    </PlayerContext.Provider>
}
export default PlayerProvider