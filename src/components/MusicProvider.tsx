import React, { Children } from 'react'
import PlayerProvider from './usePlayer'
import PlaylistProvider from './usePlaylist'


const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <PlaylistProvider>
            <PlayerProvider>
                {children}
            </PlayerProvider>
        </PlaylistProvider>
    )
}

export default MusicProvider