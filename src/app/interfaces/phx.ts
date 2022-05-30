export interface User {
    id:number;
    pseudo:string;
    email:string;
    mdp:string;

}


export interface Film {
    id:number;
    nom:string;
    duree:string;
    affiche:Blob;
    video:Blob;
    results:string;
    backdrop_path:string;
    title: string;
    poster_path:string;
    name:string;
}
