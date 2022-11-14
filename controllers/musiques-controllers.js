const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const Musique = require('../models/musique');

const MUSIQUES = [
    {
        id: '1',
        auteur: "Daft Punk",
        annee: 2013,
        titre: "Get lucky",
        imageUrl: "https://cdn-www.konbini.com/fr/images/files/2013/12/get-lucky-daft-punk.png"
    },
    {
        id: '2',
        auteur: "David Guetta ft Sia",
        annee: 2011,
        titre: "Titanium",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51cQ8TfyqJL._SX342_QL70_ML2_.jpg"
    },
    {
        id: '3',
        auteur: "Shaka Ponk",
        annee: 2019,
        titre: "Smells like teen spirits",
        imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg"
    },
    {
        id: '4',
        auteur: "Imagine Dragon",
        annee: 2018,
        titre: "Natural",
        imageUrl: "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg"
    }
];


//const getMusique = (req, res) => {
//    res.json({ MUSIQUES })}


const getMusique = async (req, res, next) => {
    let musiques;
    try{
        musiques = await Musique.find();
    }catch (err){
        const error = new HttpError('Erreur lor de la recupoeration de la liste', 500);
        return next(error);
    }
    res.json({musiques: musiques.map(m => m.toObject({getters: true})) });
}

const getMusiqueById = async (req, res, next) => {
    const mid = req.params.musiqueid;
    //console.log(mid)
    // const musique = MUSIQUES.find(m => {
    //     return m.id === mid;
    // });
    let musique;
    try{
        musique = await Musique.findById(mid);
    }catch (err){
        const error = new HttpError('Erreur lor de la recupoeration de lélément', 500);
        return next(error);
    }

    if (!musique) {
        //return res.status(404).json({ message: "Ya pas de zic a cet ID !!!" })
        return next(
            new HttpError('Musique pas trouvée', 404));
    }
    res.json({musique: musique.toObject({getters: true})});

};





const createMusique = async (req, res, next) => {
    const { titre, auteur, annee, imageUrl } = req.body;
    const createdMusique = new Musique({
        //id: uuidv4(),
        titre,
        auteur,
        annee,
        imageUrl
    })
   // MUSIQUES.push(createdMusique);
    try{
        await createdMusique.save();
    }catch (err){
        const error = new HttpError('l\'ajout na pas marché', 500);
        return next(error);
    }
    res.status(201).json({ musique: createdMusique });
}






const updateMusique = async (req, res, next) => {
    const { titre, auteur, annee, imageUrl } = req.body;
    const mId = req.params.musiqueid;
    let musique;
    try{
        musique = await Musique.findById(mid);

    } catch(err){
        const error = new HttpError('Rien a cet Id', 500);
        return next(error);
    }
    musique.auteur = auteur;
    musique.annee = annee;
    musique.titre = titre;
    musique.imageUrl = imageUrl;
    try{
        await musique.save(); 
    } catch(err){
        const error = new HttpError('error l\'or de lenregistrement', 500);
        return next(error);
    }


    // const updatedMusique = {
    //     ...MUSIQUES.find(m => {
    //         return m.id === mId;
    //     })
    // };
    // const musiqueIndex = MUSIQUES.findIndex(m => m.id === mId);
    // updatedMusique.titre = titre;
    // updatedMusique.annee = annee;
    // updatedMusique.auteur = auteur;
    // updatedMusique.imageUrl = imageUrl;

    // MUSIQUES[musiqueIndex] = updatedMusique;
    res.status(200).json({musique : musique.toObject({getters: true})});

}

const deleteMusique = async (req, res, next) => {
    const mId = req.params.musiqueid;
    let musique;
    try{
        musique = await Musique.findById(mId);
    } catch (err){
        const error = new HttpError('error l\'or de la suppresion', 500);
        return next(error);
    }


    if (!musique) {
        const error = new HttpError('error id pas trouvé', 404);
        return next(error);
    }



    try{
        await musique.remove();
    } catch (err){
        const error = new HttpError('error l\'or de la suppresion', 500);
        return next(error);


    }
    res.status(200).json({message : "Musique supprimée"})



   // MUSIQUES = MUSIQUES.filter(m=> m.id !== mId)
    



}


exports.getMusique = getMusique;

exports.getMusiqueById = getMusiqueById;

exports.createMusique = createMusique;

exports.updateMusique = updateMusique;

exports.deleteMusique = deleteMusique;