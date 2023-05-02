interface PlaylistIntfData{
    key:number,
    name?:string,
    url: string,
    thumbnail?:string
}
interface PlaylistIntf{
    key: number,
    name:string,
    data:PlaylistIntfData[]
}

export type {PlaylistIntf,PlaylistIntfData}