import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //Liste des animaux
  animals: Array<{title: string, image: string, desc: string, file: string, playing: boolean}> = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  // Index de l'animal choisi et dont le son sera joué
  animalIndex: number = null;

  //objet audio peut être partagé par tous les clics audio
  audio: HTMLAudioElement = null;

  //tricher ou pas 
  cheatMode: boolean = true;

  //Création dans ma fonction constructor de mon toast
  constructor(private toastCtrl: ToastController) {

  }
    

  /**
   * Choix aléatoire d'un animal au sein du tableau animals
   * uniquement si ce choix n'a pas été déjà fait
   */
  pickAnimal() {
    if(this.animalIndex == null) { 
      this.animalIndex = Math.floor(Math.random() * this.animals.length); 
    }
  }

  playSound(){
    // Arrêt du son en cours
    if(this.audio && this.audio.duration != this.audio.currentTime){
      this.audio.pause();
    }

    // Choix de l'animal
    this.pickAnimal();
    // Récupération de l'animal choisi
    let animal = this.animals[this.animalIndex];
    console.log(animal);

    // Lecture du son..
    //..Création d'une instance de l'objet Audio.
    //..Stockage de l'instance dans une variable d'objet..
    //..accessible pour toutes les méthodes
    this.audio = new Audio();
    this.audio.src="/assets/" + animal.file;
    // Chargement du son en mémoire
    this.audio.load();
    // Lancement de la lecture du son
    this.audio.play();


    //Mode triche
    if(this.cheatMode){

      //Afficher l'icône du son en train de jouer
      animal.playing = true;

      //Evenement sera jouer à chaque fois que le currentTime sera mis à jour
      //..avec arrow function(=>)on peut remonter qu'aux variables de la classe
      //.. avec function on peut remonter qu'aux variables locales
      //A la fin du son on va masquer l'icône
      this.audio.ontimeupdate = (ev) => {
        //si audio.duration est égal à audio.currentTime alors..
        if(this.audio.duration == this.audio.currentTime){
          //animal.playing = false
          this.animals[this.animalIndex].playing = false;
  
        }
   
      }
    } 

    
   
  }

  guessAnimal(animalName){
    //Si animalIndex est égal à nul
    if(this.animalIndex == null){
      //cliquer pour jouer
      this.showToast("Vous devez cliquer pour jouer");
      //Sinon, si animals est égal à animalName
    } else if(this.animals[this.animalIndex].title == animalName){
      this.showToast("Vous avez gagné !");

      //Réinitialisation du jeu
      this.audio.ontimeupdate = null;
      this.animals[this.animalIndex].playing = false;
      this.audio.pause(); 
      this.animalIndex = null;

    } else {
      this.showToast("Perdu essaie encore");
    }
  }
   
    async showToast (text){
      const toast = await this.toastCtrl.create({
        message: text, duration: 1000, position: 'middle'
      });

    //Affichage
    toast.present();

  }

}

  


