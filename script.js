'use strict';

// const e = require("express");


const sliderContainer = document.querySelector('.slider__container');
const btnleftSlide = document.querySelector('.btn--slider--left');
const btnrightSlide = document.querySelector('.btn--slider--right');

const sliderControl = document.querySelector('.slider__control');

let slides = document.querySelectorAll('.slide');

const dotContainer = document.querySelector('.slider__dots');
let dots = document.querySelectorAll('.slider__dot');

const items = document.querySelectorAll('.item');

const navbarLinks = document.querySelector('.navbar__links');


const slideData = [
    {
        img : 'hero3',
        headingHero : 'Black-Friday Sale',
        subHeading: 'Get upto 50% discounts.'
    },
    {
        img : 'hero1',
        headingHero : 'Comfy Collection',
        subHeading: 'cosy winter collection 2021 released.'
    },
    
    {
        img : 'hero2',
        headingHero : 'New Arrivals',
        subHeading: 'Most comfortable clothes made for you.'
    },
    {
        img : 'discount',
        headingHero : 'New Arrivals',
        subHeading: 'Most comfortable clothes made for you.'
    },



];

const itemData = [
    {
        img: 'item1',
        name: 'Denim jacket',
        price: '1,999',
        sale: 'true'
    },
    {
        img: 'item2',
        name: 'Green jacket',
        price: '2,999',
        
    },
    {
        img: 'item3',
        name: 'Denim jacket',
        price: '3,999',
        sale: 'true'
    },
    {
        img: 'item4',
        name: 'Leather jacket',
        price: '8,999'
    },
    {
        img: 'item5',
        name: 'Some brown jacket',
        price: '7,999',
    },
    {
        img: 'item6',
        name: 'Some pink coat',
        price: '4,999',
    },
    {
        img: 'item7',
        name: 'Wool-blend faux shearling coat',
        price: '7,999'
    },
    {
        img: 'item8',
        name: 'Padded hooded jacket',
        price: '3,999',
        sale: 'true'
    },
    {
        img: 'item1',
        name: 'Some pink coat',
        price: '7,999'
    },
    {
        img: 'item3',
        name: 'Green jacket',
        price: '3,999'
    },


]

let currentSlide = 1;


//  AUTOSLIDER AFTER 5000/1000 = 5sec
let autoSlider = setInterval(()=> nextSlide(),5000);

//THIS WILL RESET SLIDER EVERYTIME SLIDEMOVE
const resetAutoSlider = function(){
    clearInterval(autoSlider);
    autoSlider = setInterval(()=> nextSlide(), 5000);
}


//CREATE DOTS
const createDots = function(){
    dotContainer.innerHTML = '';
    slides.forEach((el, i) => {
        const dotHTML = `<div class="slider__dot" data-slide=${i + 1}></div>`;
        dotContainer.insertAdjacentHTML('beforeend', dotHTML);
    })
    dots = document.querySelectorAll('.slider__dot');
   
}

//CREATE
const setDot = function(slide){
    dots.forEach((el, i) => {
    (+el.dataset.slide === slide) 
    ? el.classList.add('slider__dot--active') 
    : el.classList.remove('slider__dot--active');
    })
}


//CREATE SLIDES
const createSlides = function(data){
    sliderContainer.innerHTML = '';
    data.forEach((el, i) => {
        const slideHTML = `<div class="slide">
        <div class="slide__detail">
            <h1 class="heading--hero">
                ${el.headingHero}
            </h1>
            <p class="heading--detail">
                ${el.subHeading}
            </p>

            <button class="btn btn--shop">
                Show Now
            </button>
        </div>

        <div class="slide__img">
            <img src="vendors/imgs/${el.img}.png" alt="Slide item ${i + 1}">
        </div>
        
    </div>`

    sliderContainer.insertAdjacentHTML('beforeend' , slideHTML);
    })
    slides = document.querySelectorAll('.slide');
    

}

//MOVE SLIDE
const moveSlide = function(slide){
    slides.forEach((el, i) => {
        el.style.transform = `translateX(${ 100 * (i - slide + 1) }%)`;
    })
    resetAutoSlider();
    setDot(currentSlide);
}

//INITILIZE PROJECT
const init = function(){
    createSlides(slideData);
    createDots();
    moveSlide(currentSlide);
    setDot(currentSlide);
}

init();

////////////////////////////////////

//NEXT SLIDE
const nextSlide = function(){
    if(currentSlide === slides.length){
        currentSlide = 1;
    }
    else{
        currentSlide++;
    }
    moveSlide(currentSlide);
}

//PREVIOUS SLIDE
const prevSlide = function(){
    if(currentSlide === 1){
        currentSlide = slides.length;
    }
    else{
        currentSlide--;
    }
    moveSlide(currentSlide);
}

//DOTS CLICK EVENTS
dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('slider__dot')){
        const slide = +e.target.dataset.slide;
        moveSlide(slide)
        setDot(slide);
        currentSlide = slide;
    }
})

//SLIDER DOM TRANSVERSION
sliderControl.addEventListener('click', function(e){
    if(e.target.classList.contains('btn--slider--right')){
        nextSlide();
        
    }
    if(e.target.classList.contains('btn--slider--left')){
        prevSlide();
    }

});



////SECTION STORE

const setItems = function(data){



    items.forEach((el, i) => {
        const price = (Number(data[i].price.split(',').reduce(((i, curr)=> i+curr), '')));

        const intlPrice = new Intl.NumberFormat(navigator.language , {style: 'currency', currency:'INR'}).format(price);
        

        const child = el.children;
        child[0].innerHTML = `<img src="vendors/imgs/${data[i].img}.png" alt="Item ${i + 1}">`
        child[1].textContent = data[i].name;
        child[2].textContent = intlPrice;

        const saleHTML =  `<div class="item__sale">Sale</div>`;
        if(data[i].sale) el.insertAdjacentHTML('beforeend', saleHTML);
    })
}
setItems(itemData);

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight'){
       nextSlide();
       
    }
    if(e.key === 'ArrowLeft'){
        prevSlide();
        
    }   
})


//SCROLL TO EVENT DELIGATION

navbarLinks.addEventListener('click', function(e){

    if(e.target.classList.contains('navbar__link')){

        const link = e.target;

        const element = document.querySelector(link.dataset.section).getBoundingClientRect();
        
        console.log(element);
       
        element.scrollIntoView({
            behaviou: 'smooth'
        });
        // window.scrollTo({
        //     top: element.top + window.scrollY,
        //     left: element.left + window.scrollX,
        // })
        

    }

});