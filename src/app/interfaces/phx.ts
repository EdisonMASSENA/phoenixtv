export interface User {
    id:number;
    pseudo:string;
    email:string;
    mdp:string;

}


export interface Film {
    id:number;
    nom:string;
    acteur:string;
    realisateur:string;
    genre:string;
    description:string;
    duree:string;
    note:string;
    date:string;

    results:string;
    backdrop_path:string;
    title: string;
    poster_path:string;
    name:string;
}
