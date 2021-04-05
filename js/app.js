'use strict'

const keywordArr= [];

function ImgStorage(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    ImgStorage.allimageStorage.push(this);
  }
  ImgStorage.allimageStorage = [];


  ImgStorage.prototype.renderImages = function() {

    let divElement = $("<div></div>").attr('class', this.keyword) ; // Container Element
    let h2Element = $("<h2></h2>").text(this.title); //
    let imgElement = $("<img>").attr('src', this.image_url);
    let pElement = $("<p></p>").text(this.description);
    
    $(divElement).append(h2Element, imgElement, pElement)
    $("#horned-animals").append(divElement)
}

  function objectFile(arrayObject) {   
  
    arrayObject.forEach(animalPic => {
        
    new ImgStorage(animalPic.image_url, animalPic.title, animalPic.description, animalPic.keyword, animalPic.horns);
    
            if ($(`select:contains(${animalPic.keyword})`).length === 0){
            renderAnimalOptions(animalPic.keyword);
            }
    });
    ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderImages());
  }


function renderAnimalOptions(dropdownOptions){
    $('select').append('<option>' + dropdownOptions + '</option>');
  }

$.ajax('data/page-1.json').then(objectFile); 

$('select').on('change', filterSelection);

function filterSelection(event) {
  $('#horned-animals').empty();
  console.log(event.target.value)


   ImgStorage.allimageStorage.forEach(animalpic => {
    if (animalpic.keyword === event.target.value){
            animalpic.renderImages()    
        }
  });
}

