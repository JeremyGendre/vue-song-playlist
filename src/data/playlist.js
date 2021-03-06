/**
 * Merge the current playlist songs's array with a new songs array
 * @param playlistSongs
 * @param newSongs
 * @returns {any[]}
 */
export function mergeSongs(playlistSongs, newSongs)
{
    const unsharedSongs = newSongs.filter(song => playlistSongs.find(oneSong => oneSong.id === song.id) === undefined);
    return [ ...playlistSongs, ...unsharedSongs ];
}