import React, { useEffect, useMemo, useState } from 'react'

type Position = number | "start" | "end"

interface PlaylistAPI {
  tracks: File[]
  currentTrack: File | null
  currentIndex: number
  addTrack: (track: File, pos: Position) => void
  addTracks: (newTracks: File[], pos: Position) => void
  removeTrack: (index: number) => void
  moveTrack: (fromIndex: number, toIndex: number) => void
  changeCurrentTrack: (pos: Position) => void
  playNext: () => void
  playPrev: () => void
}

const PlaylistContext = React.createContext({} as PlaylistAPI)


export const usePlaylist = () => {
  return React.useContext(PlaylistContext)
}

const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [tracks, setTracks] = useState<File[]>([])
  const [currentTrack, setCurrentTrack] = useState<File | null>(null)

  useEffect(() => {
    if (tracks.length === 0 || currentTrack) return undefined

    setCurrentTrack(tracks[0])
  }, [tracks])

  const changeCurrentTrack = (pos: Position) => {
    if (typeof pos === "string") {
      pos === "start" && setCurrentTrack(tracks[0])
      pos === "end" && setCurrentTrack(tracks[tracks.length - 1])
    } else {
      if (tracks.length <= pos) {
        setCurrentTrack(tracks[0])
      } else if (pos < 0) {
        setCurrentTrack(tracks[tracks.length - 1])
      } else {
        setCurrentTrack(tracks[pos])
      }
    }
  }

  const currentIndex = useMemo((): number => {
    return tracks.findIndex(t => t.name === currentTrack?.name)
  }, [currentTrack, tracks])

  const playNext = () => {
    changeCurrentTrack(currentIndex + 1)
  }

  const playPrev = () => {
    changeCurrentTrack(currentIndex - 1)
  }

  const addTrack = (track: File, pos: Position) => {
    if (pos === "start") {
      return setTracks([track, ...tracks])
    } else if (pos === "end") {
      return setTracks([...tracks, track])
    }

    const newTracks = [...tracks]
    newTracks.splice(pos, 0, track)
    setTracks(newTracks)
  }

  const addTracks = (newTracks: File[], pos: Position) => {
    if (pos === "start") {
      return setTracks([...newTracks, ...tracks])
    } else if (pos === "end") {
      return setTracks([...tracks, ...newTracks])
    }

    const tracksCopy = [...tracks]
    tracksCopy.splice(pos, 0, ...newTracks)
    setTracks(tracksCopy)
  }

  const removeTrack = (index: number) => {
    setTracks(tracks.filter((_t, i) => i !== index))
  }

  const moveTrack = (fromIndex: number, toIndex: number) => {
    const newTracks = [...tracks]
    const track = newTracks.splice(fromIndex, 1)[0]
    newTracks.splice(toIndex, 0, track)
  }

  const playlistAPI = {
    tracks,
    currentTrack,
    currentIndex,
    addTrack,
    removeTrack,
    moveTrack,
    changeCurrentTrack,
    playNext,
    playPrev,
    addTracks
  }

  return <PlaylistContext.Provider value={playlistAPI}>
    {children}
  </PlaylistContext.Provider>
}


export default PlaylistProvider